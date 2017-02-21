import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { routing, appRoutingProviders } from './app.routing';

import { Login1Module } from './login1/login1.module';
import { Heroes1Module } from './heroes1/heroes.module';
import { CrisisCenter1Module } from './crisis-center1/crisis-center1.module';
import { DialogService } from './shared/dialog.service';

@NgModule({
  imports: [  
    BrowserModule,
    FormsModule,
    CrisisCenter1Module,
    Login1Module,  // 平级特性区，导航path是平级形式 ##
    routing,
    // Heroes1Module  // 注释掉。转而使用路由来延迟加载
  ],
  declarations: [
    AppComponent,
  ],
  providers: [
    appRoutingProviders,
    DialogService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

/**
 * 在 AppModule 中注册路由器模块会让该路由器在应用的任何地方都能被使用。
 */
