import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';
platformBrowserDynamic().bootstrapModule(AppModule);  // Angular 的浏览器 platformBrowserDynamic 函数应用 module, AppModule 
// -> 然后，调用 bootstrap 函数，并且把 AppComponent 传进去。
