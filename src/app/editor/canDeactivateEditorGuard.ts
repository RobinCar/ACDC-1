import { Injectable } from "@angular/core";
import { CanDeactivate } from "@angular/router";
import { EditorComponent } from "./editor.component";

/**
 * Utilisé par Angluar pour demander confirmation avant de fermer un éditeur avec des données non sauvegardées
 */
@Injectable()
export class CanDeactivateEditorGuard implements CanDeactivate<EditorComponent> {

  /**
   * Permet de demander confirmation avant de fermer un éditeur avec des données non sauvegardées
   * @param component Composant à vérifier
   */
  canDeactivate(component: EditorComponent): boolean {
   
    if(component.hasUnsavedData()){
        return confirm("You have unsaved changes! If you leave, your changes will be lost.");
    }else{
        return true;
    }
    
  }
}