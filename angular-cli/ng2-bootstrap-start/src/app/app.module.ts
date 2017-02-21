import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { Ng2BootstrapModule } from 'ng2-bootstrap/ng2-bootstrap';
import { ModalDemoComponent } from './modal-demo-component/modal-demo.component';

@NgModule({
  declarations: [
    AppComponent,
    ModalDemoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,

    Ng2BootstrapModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
