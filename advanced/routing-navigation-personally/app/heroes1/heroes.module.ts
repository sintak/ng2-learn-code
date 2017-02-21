import { NgModule }           from '@angular/core';
import { CommonModule } from '@angular/common';  // for *ngIf/*ngFor
import { FormsModule } from '@angular/forms';  // for ngModel

import { HeroList1Component }   from './hero-list1.component';
import { HeroDetail1Component } from './hero-detail1.component';
import { routing } from './heroes.routing';

import { HeroService1 } from './hero.service1';

@NgModule({
  imports: [ routing, CommonModule, FormsModule ],
  declarations: [HeroList1Component, HeroDetail1Component],
  providers: [ HeroService1 ]
})
export class Heroes1Module {
}