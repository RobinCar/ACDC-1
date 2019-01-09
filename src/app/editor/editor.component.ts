import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Coordinates } from "../model/coordinates"
import { Rectangle } from "../model/rectangle";
import { ImageWithTHML } from "../model/image";
import { ImageService } from '../imageService/image.service';
import * as Tesseract from 'tesseract.js';

/**
 * Composant permettant l'édition d'une image passée en paramètre dans l'url
 */
@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {

  /**
   * Constante systeme representant le bouton gauche de la souris
   */
  private static readonly MOUSE_LEFT_BTN = 0;

  //CANVAS
  /**
   * Récupère la référence vers le canvas depuis le HTML
   */
  @ViewChild('editorCanvas')
  private canvasRef: ElementRef;
  /**
   * Objet canvas utilisable par TypeScript
   */
  private canvas: HTMLCanvasElement;
  /**
   * Objet utilisé pour dessiner sur le canvas
   */
  private drawContext: CanvasRenderingContext2D;

  //IMAGE
  /**
   * Image éditée
   */
  private image: ImageWithTHML;

  //DRAWING
  /**
   * Attribut déterminant si la souris est appuyée ou non
   */
  private mouseIsDown: boolean = false;
  /**
   * Coordonées du début du tracé
   */
  private startPoint: Coordinates;
  /**
   * Cooronées de la fin du tracé
   */
  private endPoint: Coordinates;
  /**
   * Liste de tous les rectangles tracés, permettant de les annuler
   */
  private undoList: Rectangle[] = new Array();
  /**
   * Liste des tous les rectangles annulés, permettant de les retracer
   */
  private redoList: Rectangle[] = new Array();

  /**
   * Parametres pour utiliser tesseract
   */
  private TESSERACT_PARAMETERS = {
    workerPath: 'https://cdn.jsdelivr.net/gh/naptha/tesseract.js@' + require('../../../node_modules/tesseract.js/package.json').version + '/dist/worker.min.js',
    langPath: 'https://tessdata.projectnaptha.com/3.02/',
    corePath: 'https://cdn.jsdelivr.net/gh/naptha/tesseract.js-core@0.1.0/index.js',
  };

  //INIT METHODS

  /**
   * Construit le composant et récupère l'image à modifier depuis l'url
   */
  constructor(private route: ActivatedRoute, private location: Location, private router: Router, private imageService: ImageService) {
    this.route.queryParams.subscribe(params => {
      let path = params['path'];
      if (path != null) {
        this.image = imageService.getImage(path);
      } else {
        this.router.navigateByUrl("");
      }
    });
  }

  /**
   * Initialise le composant
   */
  ngOnInit() {
    this.initCanvas();
    this.initDrawing();
  }

/**
 * Methode utilisant tesseract pour trouver le texte dans l'image
 * @param hide 
 */
  public findText(hide: (results: { x0: number, y0: number, x1: number, y1: number }[]) => void) {
    const tesseract: Tesseract.TesseractStatic = Tesseract.create(this.TESSERACT_PARAMETERS);

    tesseract.recognize(this.image.htmlImageElement).then(function(result) {
      let res: { x0: number, y0: number, x1: number, y1: number }[] = new Array();
      result.words.forEach(element => {
        if (element.confidence >= 60 && element.bbox.x1 - element.bbox.x0 > 10 && element.bbox.y1 - element.bbox.y0 > 10) {
          res.push({ x0: element.bbox.x0, y0: element.bbox.y0, x1: element.bbox.x1, y1: element.bbox.y1 });
        }
      });
      hide(res);
    });

  }

  /**
   * Methode appellee lorque l'on appuie sur le bouton "auto" pour cacher le texte
   */
  private hideText() {

    this.findText(result => {
      result.forEach(element => {
        this.draw(element.x0, element.y0, element.x1, element.y1);
      });
    });

  }

  /**
   * Permet de cacher une zone correspondant aux coordonnees en parametre
   * @param x0 
   * @param y0 
   * @param x1 
   * @param y1 
   */
  public draw(x0, y0, x1, y1) {
    this.startPoint = new Coordinates(x0, y0);
    this.endPoint = new Coordinates(x1, y1);
    this.rebuild();
    this.createRectangle();
  }

  /**
   * Initialise le canvas
   */
  private initCanvas() {
    this.canvas = <HTMLCanvasElement>this.canvasRef.nativeElement;
    this.drawContext = this.canvas.getContext('2d');
    this.drawImage();
  }

  /**
   * Initialise les fonctions de dessin
   */
  private initDrawing() {
    this.canvas.addEventListener("mousedown", this.mouseDownAction.bind(this));
    this.canvas.addEventListener("mousemove", this.mouseMoveAction.bind(this));
    this.canvas.addEventListener("mouseup", this.mouseUpAction.bind(this));
  }

  //DRAWING EVENTS

  /**
   * Action appelée lors d'un clic sur le canvas
   */
  private mouseDownAction(ev: MouseEvent) {
    if (ev.button == EditorComponent.MOUSE_LEFT_BTN) {
      this.mouseIsDown = true;
      this.startPoint = this.computeEventCoordinates(ev);
    }
  }

  /**
   * Action appellée lorsque la souris est déplacée
   */
  private mouseMoveAction(ev: MouseEvent) {
    if (this.mouseIsDown) {
      let temporaryPoint: Coordinates = this.computeEventCoordinates(ev);
      if (!temporaryPoint.equals(this.startPoint)) {
        this.rebuild();
        this.drawSelectionRectangle(new Rectangle(
          this.startPoint,
          temporaryPoint
        ));
      }
    }
  }

  /**
   * Action appellée lorsque la souris est relachée
   */
  private mouseUpAction(ev: MouseEvent) {
    if (this.mouseIsDown && ev.button == EditorComponent.MOUSE_LEFT_BTN) {
      this.mouseIsDown = false;
      this.endPoint = this.computeEventCoordinates(ev);
      this.rebuild();
      this.createRectangle();
    }
  }

  /**
   * Calcule les coordonées utilisables dans le canvas à partir des coordonées de l'event
   */
  private computeEventCoordinates(ev: MouseEvent): Coordinates {
    return new Coordinates(
      (ev.layerX / this.canvas.offsetWidth) * this.canvas.width,
      (ev.layerY / this.canvas.offsetHeight) * this.canvas.height
    );
  }

  //DRAWING METHODS

  /**
   * Réinitialise le canvas et dessine l'image éditée
   */
  private drawImage() {
    this.image.clear();
    this.canvas.width = this.image.width;
    this.canvas.height = this.image.height;
    this.drawContext.drawImage(this.image.htmlImageElement, 0, 0);
  }

  /**
   * Crée un nouveau rectangle entre les points de départ et d'arrivée
   */
  private createRectangle() {
    if (!this.startPoint.equals(this.endPoint)) {
      let rectangle: Rectangle = new Rectangle(
        this.startPoint,
        this.endPoint
      )
      this.undoList.push(rectangle);
      this.redoList = new Array();
      this.drawRectangle(rectangle);
    }
  }

  /**
   * Réinitialise le canvas et redessine tous les rectangles sauvegardés dans undoList
   */
  private rebuild() {
    this.drawContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawImage();
    this.undoList.forEach(element => {
      this.drawRectangle(element);
    });
  }

  /**
   * Déssine un réctangle sur le canvas
   * @param rectangle Rectangle à dessiner
   */
  private drawRectangle(rectangle: Rectangle) {
    this.drawContext.beginPath();
    this.drawContext.rect(
      rectangle.p1.x,
      rectangle.p1.y,
      rectangle.p2.x - rectangle.p1.x,
      rectangle.p2.y - rectangle.p1.y
    );
    this.drawContext.fillStyle = 'black';
    this.drawContext.fill();
  }

  /**
   * Dessine un rectangle en pointillés sur le canvas
   * @param rectangle Rectangle à dessiner
   */
  private drawSelectionRectangle(rectangle: Rectangle) {
    this.drawContext.beginPath();
    this.drawContext.rect(
      rectangle.p1.x,
      rectangle.p1.y,
      rectangle.p2.x - rectangle.p1.x,
      rectangle.p2.y - rectangle.p1.y
    );
    this.drawContext.setLineDash([10, 10]);
    this.drawContext.lineWidth = 3;
    this.drawContext.shadowColor = 'white';
    this.drawContext.shadowBlur = 2;
    this.drawContext.strokeStyle = 'black';
    this.drawContext.stroke();
  }

  //GUI METHODS

  /**
   * Annule le dernier tracé
   */
  public undo() {
    if (this.undoList.length > 0) {
      this.redoList.push(this.undoList.pop());
      this.rebuild();
    }
  }

  /**
   * Refait le dernier tracé annulé
   */
  public redo() {
    if (this.redoList.length > 0) {
      let reDraw: Rectangle = this.redoList.pop()
      this.undoList.push(reDraw);
      this.drawRectangle(reDraw);
    }
  }

  /**
   * Supprime tous les tracés
   */
  public clear() {
    this.undoList = new Array();
    this.redoList = new Array();
    this.drawImage();
  }

  /**
   * Sauvegarde l'image éditée 
   */
  public save() {
    this.imageService.save(this.image);
  }

  /**
   * Demande confirmation avant de fermer la fenêtre avec des données non sauvegardées
   */
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.hasUnsavedData()) {
      $event.returnValue = true;
    }
  }

  /**
   * Verifie si le composant a des données non sauvegardées (inverse de isSaved())
   */
  public hasUnsavedData(): boolean {
    return this.undoLength > 0;
  }

  /**
   * Verifie si le composant est bien sauvegardé (inverse de hasUnsavedData())
   */
  public isSaved(): boolean {
    return !this.hasUnsavedData();
  }

  /**
   * Nombre de tracés qui peuvent être refaits
   */
  public get redoLength(): number {
    return this.redoList.length;
  }

  /**
   * Nombre de tracés qui peuvent être annulés
   */
  public get undoLength(): number {
    return this.undoList.length;
  }

}
