import { NgModule }            from '@angular/core';
// 替换到SharedModule // import { CommonModule }        from '@angular/common';
// 替换到SharedModule // import { FormsModule }         from '@angular/forms';
import { SharedModule }        from '../shared/shared.module';

import { HeroComponent }       from './hero.component';
import { HeroDetailComponent } from './hero-detail.component';
import { HeroListComponent }   from './hero-list.component';
// 替换到SharedModule // import { HighlightDirective }  from './highlight.directive';
import { routing }             from './hero.routing';

@NgModule({
  imports: [ /*CommonModule, FormsModule,*/SharedModule, routing ],
  declarations: [
    HeroComponent, HeroDetailComponent, HeroListComponent,
    // HighlightDirective
  ]
})
export class HeroModule { }


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/