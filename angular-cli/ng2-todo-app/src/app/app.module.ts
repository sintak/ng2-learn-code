import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { MyNewComponentComponent } from './my-new-component/my-new-component.component';
import { ToDoAppComponent } from './category-login/to-do-app/to-do-app.component';
import { MyNewPipePipe } from './groceries/my-new-pipe.pipe';
import { MyNewDirectiveDirective } from './groceries/my-new-directive.directive';

@NgModule({
  declarations: [
    AppComponent,
    MyNewComponentComponent,
    ToDoAppComponent,
    MyNewPipePipe,
    MyNewDirectiveDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
