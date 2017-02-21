import { BrowserModule as BrMo } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { TestsService } from './tests.service';

// import { AppModule as MyAppModule }  from 'bootstrap-scss-start/src/app/app.module';
import { App1Module } from 'angular-quickstart_sintak/app/app.module'
// import { App1Component } from 'angular-quickstart_sintak/app/app.component'

@NgModule({
  declarations: [
    AppComponent//, App1Component
  ],
  imports: [
    BrMo,
    FormsModule,
    HttpModule,
    // MyAppModule,
    App1Module
  ],
  providers: [TestsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
