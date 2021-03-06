import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';

import { AppComponent }         from './app.component';
import { routing,
         appRoutingProviders }  from './app.routing';

import { HeroesModule }         from './heroes/heroes.module';
import { CrisisCenterModule }   from './crisis-center/crisis-center.module';

import { LoginComponent }       from './login.component';

import { DialogService }        from './dialog.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    routing,
    HeroesModule,
    CrisisCenterModule
  ],
  declarations: [
    AppComponent,
    LoginComponent
  ],
  providers: [
    appRoutingProviders,
    DialogService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}

/**
 * 在 AppModule 中注册路由器模块会让该路由器在应用的任何地方都能被使用。
 */

/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/