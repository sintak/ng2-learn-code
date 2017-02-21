import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';

import { Admin1Component } from './admin1.component';
import { Admin1DashboardComponent } from './admin1-dashboard.component';
import { Manage1CrisesComponent } from './manage1-crises.component';
import { Manage1HeroesComponent } from './manage1-heroes.component';

import { adminRouting } from './admin1.routing';

@NgModule({
    imports: [
        CommonModule,
        adminRouting
    ],
    declarations: [
        Admin1Component,
        Admin1DashboardComponent,
        Manage1CrisesComponent,
        Manage1HeroesComponent
    ]    
})
export class Admin1Module{}