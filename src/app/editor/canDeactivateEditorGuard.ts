import { Injectable } from "@angular/core";
import { CanDeactivate } from "@angular/router";
import { EditorComponent } from "./editor.component";

@Injectable()
export class CanDeactivateEditorGuard implements CanDeactivate<EditorComponent> {

  canDeactivate(component: EditorComponent): boolean {
   
    if(component.hasUnsavedData()){
        if (confirm("You have unsaved changes! If you leave, your changes will be lost.")) {
            return true;
        } else {
            return false;
        }
    }else{
        return true;
    }
  }
}