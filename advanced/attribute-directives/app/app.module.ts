import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HighlightDirective } from './highlight.directive';
@NgModule({
  imports: [ BrowserModule ],
  declarations: [
    AppComponent,
    HighlightDirective  // 把 HighlightDirective 列在元数据的 declarations 数组中，来告诉Angular有这样一个指令
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
