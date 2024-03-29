import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SelectionComponent } from '../selection/selection.component';
import { EditorComponent } from '../editor/editor.component';
import { CanDeactivateEditorGuard } from '../editor/canDeactivateEditorGuard';

const routes: Routes = [
  { path: '', redirectTo: '/select', pathMatch: 'full' },
  { path: 'select', component:SelectionComponent },
  { path: 'edit', component:EditorComponent, canDeactivate:[CanDeactivateEditorGuard]}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
