import { Component, OnInit } from '@angular/core';

import { Router } from "@angular/router";

import { ImageService } from "../imageService/image.service"
import { ImageWithTHML } from '../model/image';

/**
 * Composant permettant de sélectionner une image à éditer depuis la liste de toutes les images
 */
@Component({
  selector: 'app-selection',
  templateUrl: './selection.component.html',
  styleUrls: ['./selection.component.css']
})
export class SelectionComponent implements OnInit {

  /**
   * Liste des images
   */
  images: ImageWithTHML[];

  /**
   * Crée le composant
   */
  constructor(private router: Router,private imageService:ImageService) {
    this.images = imageService.getImages();
  }

  /**
   * Initialise le composant
   */
  ngOnInit() {
  }

  /**
   * Redirige vers l'interface d'édition de l'image selectionnée
   * @param image Image à éditer
   */
  onSelect(image: ImageWithTHML) {
    this.router.navigate(['/edit'], { queryParams: { path: image.src } });
  }
  
}
