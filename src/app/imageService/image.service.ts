import { Injectable } from '@angular/core';
import { IMAGES } from './mock-images';
import { ImageWithTHML } from '../model/image';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor() { }

  getImages():ImageWithTHML[]{
    //Remplacer par un accès à Firebase
    return IMAGES;
  }

  getImage(path:string){
    //Utiliser un ID plutôt que le chemin ici et dans le lien si présent dans firebase
    return new ImageWithTHML(path);
  }

  save(image:ImageWithTHML){
    //Sauvegarder l'image dans firebase
  }

}