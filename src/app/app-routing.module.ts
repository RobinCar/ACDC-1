import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SelectionComponent } from './selection/selection.component';

const routes: Routes = [
  { path: '', redirectTo: '/select', pathMatch: 'full' },
  { path: 'select', component:SelectionComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
