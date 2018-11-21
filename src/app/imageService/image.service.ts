import { Injectable } from '@angular/core';
import { IMAGES } from './mock-images';
import { ImageWithTHML } from '../model/image';


/**
 * Service permettant l'itéraction avec la base de données
 */
@Injectable({
  providedIn: 'root'
})
export class ImageService {

  /**
   * Crée le service
   */
  constructor() { }

  /**
   * Récupère la liste des images éditables
   */
  getImages():ImageWithTHML[]{
    //TODO Remplacer par un accès à Firebase
    return IMAGES;
  }

  /**
   * Crée un objet ImageWithTHML à partir de l'URL de l'image
   * @param path URL de l'image
   */
  getImage(path:string):ImageWithTHML{
    return new ImageWithTHML(path);
  }

  /**
   * Sauvegarde une image après édition
   * @param image Image à sauvegarder
   */
  save(image:ImageWithTHML){
    //TODO Sauvegarder l'image dans firebase
  }

}
