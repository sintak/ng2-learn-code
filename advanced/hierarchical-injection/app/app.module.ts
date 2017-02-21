import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { HeroesListComponent } from './heroes-list.component';
import { HeroEditorComponent } from './hero-editor.component';
import { HeroCardComponent } from './hero-card.component';
import { HeroesService } from './heroes.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [ HeroesService ],
  declarations: [
    HeroesListComponent,
    HeroCardComponent,
    HeroEditorComponent
  ],
  bootstrap: [ HeroesListComponent ]
})
export class AppModule { }

/* Documentation artifact below
// Don't do this!
@NgModule({
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [ HeroesService, RestoreService ],
  declarations: [ HeroesListComponent ],
  bootstrap: [
    HeroesListComponent,
    HeroCardComponent,
    HeroEditorComponent
  ]
})
*/


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/