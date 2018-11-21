import { Component, OnInit } from '@angular/core';

/**
 * Permet de créer une fenetre modale
 */
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  /**
   * Rend le modal visible ou non
   */
  public visible = false;
  /**
   * Permet l'animation lors de l'apparition et la disparition du modal
   */
  public visibleAnimate = false;

  /**
   * Crée le composant
   */
  constructor() { }

  /**
   * Initialise le composant
   */
  ngOnInit() {
  }

  /**
   * Affiche le modal avec une animation
   */
  public show(): void {
    this.visible = true;
    setTimeout(() => this.visibleAnimate = true, 100);
  }

  /**
   * Cache le modal avec une animation
   */
  public hide(): void {
    this.visibleAnimate = false;
    setTimeout(() => this.visible = false, 300);
  }

  /**
   * Permet la supperposition de plusieurs modals
   */
  public onContainerClicked(event: MouseEvent): void {
    if ((<HTMLElement>event.target).classList.contains('modal')) {
      this.hide();
    }
  }

}
