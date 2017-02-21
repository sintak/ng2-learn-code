import { NgModule }           from '@angular/core';
import { CommonModule } from '@angular/common';  // for *ngIf/*ngFor
import { FormsModule } from '@angular/forms';  // for ngModel

import { CrisisCenter1Component }   from './crisis-center1.component';
import { CrisisList1Component } from './crisis-list1.component';
import { CrisisCenterHome1Component } from './crisis-center-home1.component';
import { CrisisDetail1Component } from './crisis-detail1.component';
import { routing } from './crisis-center1.routing';

import { Crisis1Service } from './crisis1.service';
import { CrisisDetailResolve1 } from './crisis-detail-resolve1.service';

@NgModule({
  imports: [ routing, CommonModule, FormsModule ],
  declarations: [CrisisCenter1Component, CrisisList1Component, 
    CrisisCenterHome1Component, CrisisDetail1Component],
  providers: [ Crisis1Service, CrisisDetailResolve1 ]
})
export class CrisisCenter1Module {
}