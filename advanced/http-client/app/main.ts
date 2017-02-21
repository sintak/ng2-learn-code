// The browser platform with a compiler
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

// The app module
import { AppModule } from './app.module';

// Compile and launch the module
platformBrowserDynamic().bootstrapModule(AppModule);

// # 使用预编译器（ AoT - Ahead-Of-Time ）进行静态引导
// // The browser platform without a compiler
// import { platformBrowser } from '@angular/platform-browser';

// // The app module factory produced by the static offline compiler
// import { AppModuleNgFactory } from './app.module.ngfactory';

// // Launch with the app module factory.
// platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);
