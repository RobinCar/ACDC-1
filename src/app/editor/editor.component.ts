import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Coordinates } from "../model/coordinates"
import { Rectangle } from "../model/rectangle";
import { ImageWithTHML } from "../model/image";
import { ImageService } from '../imageService/image.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {

  private static readonly MOUSE_LEFT_BTN = 0;

  //CANVAS
  @ViewChild('editorCanvas')
  private canvasRef: ElementRef;
  private canvas: HTMLCanvasElement;
  private drawContext: CanvasRenderingContext2D;

  //IMAGE
  private image:ImageWithTHML;

  //DRAWING
  private mouseIsDown: boolean = false;
  private startPoint: Coordinates;
  private endPoint: Coordinates;
  private undoList: Rectangle[] = new Array();
  private redoList: Rectangle[] = new Array();


  //INIT METHODS

  constructor(private route: ActivatedRoute, private location: Location, private router: Router, private imageService:ImageService) {
    this.route.queryParams.subscribe(params => {
      let path = params['path'];
      if(path != null){
        this.image = imageService.getImage(path);
      }else{
        this.router.navigateByUrl("");
      }
    });
  }

  ngOnInit() {
    this.initCanvas();
    this.initDrawing();
  }

  private initCanvas() {
    this.canvas = <HTMLCanvasElement>this.canvasRef.nativeElement;
    this.drawContext = this.canvas.getContext('2d');
    this.drawImage();
  }

  private initDrawing() {
    this.canvas.addEventListener("mousedown", this.mouseDownAction.bind(this));
    this.canvas.addEventListener("mousemove", this.mouseMoveAction.bind(this));
    this.canvas.addEventListener("mouseup", this.mouseUpAction.bind(this));
  }

  //DRAWING EVENTS

  private mouseDownAction(ev: MouseEvent) {
    if (ev.button == EditorComponent.MOUSE_LEFT_BTN) {
      this.mouseIsDown = true;
      this.startPoint = this.computeEventCoordinates(ev);
    }
  }

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

  private mouseUpAction(ev: MouseEvent) {
    if (this.mouseIsDown && ev.button == EditorComponent.MOUSE_LEFT_BTN) {
      this.mouseIsDown = false;
      this.endPoint = this.computeEventCoordinates(ev);
      this.rebuild();
      this.createRectangle();
    }
  }

  private computeEventCoordinates(ev: MouseEvent): Coordinates {
    return new Coordinates(
      (ev.layerX / this.canvas.offsetWidth) * this.canvas.width,
      (ev.layerY / this.canvas.offsetHeight) * this.canvas.height
    );
  }

  //DRAWING METHODS

  private drawImage() {
    this.image.clear();
    this.canvas.width = this.image.width;
    this.canvas.height = this.image.height;
    this.drawContext.drawImage(this.image.htmlImageElement, 0, 0);
  }

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

  private rebuild() {
    this.drawContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawImage();
    this.undoList.forEach(element => {
      this.drawRectangle(element);
    });
  }

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

  public undo() {
    if (this.undoList.length > 0) {
      this.redoList.push(this.undoList.pop());
      this.rebuild();
    }
  }

  public redo() {
    if (this.redoList.length > 0) {
      let reDraw: Rectangle = this.redoList.pop()
      this.undoList.push(reDraw);
      this.drawRectangle(reDraw);
    }
  }

  public clear() {
    this.undoList = new Array();
    this.redoList = new Array();
    this.drawImage();
  }

  public save() {
    this.imageService.save(this.image);
  }

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.hasUnsavedData()) {
      $event.returnValue = true;
    }
  }

  public hasUnsavedData(): boolean {
    return this.undoLength > 0;
  }

  public isSaved(): boolean {
    return !this.hasUnsavedData();
  }

  public get redoLength(): number {
    return this.redoList.length;
  }

  public get undoLength(): number {
    return this.undoList.length;
  }
  
}
