import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { SelectionComponent } from './selection/selection.component';
import { AppRoutingModule } from './routing/app-routing.module';
import { HttpClientModule }    from '@angular/common/http';
import { EditorComponent } from './editor/editor.component';
import { ModalComponent } from './modal/modal.component';
import { CanDeactivateEditorGuard } from './editor/canDeactivateEditorGuard';

@NgModule({
  declarations: [
    AppComponent,
    SelectionComponent,
    EditorComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [CanDeactivateEditorGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
