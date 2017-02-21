import {
    ModuleWithProviders, NgModule,
    Optional, SkipSelf
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { TitleComponent } from './title.component';
import { UserService, UserServiceConfig } from './user.service';

@NgModule({
    imports: [CommonModule],
    declarations: [TitleComponent],
    exports: [TitleComponent],
    providers: [UserService]  // 注册服务
})
export class CoreModule {
    ID: string | number;

    // # 禁止多次导入 CoreModule. 做到只有根模块 AppModule 才能导入 CoreModule 。
    // 这个构造函数会要求 Angular 把 CoreModule 注入自身。
    // @SkipSelf 让 Angular 在其父注入器中查找 CoreModule
    //   如果该构造函数在我们所期望的 AppModule 中运行，就没有任何祖先注入器能够提供 CoreModule 的实例，于是注入器会放弃查找。
    //   如果它的父注入器却是根注入器了（而上次父注入器是空）。 当然，这次它找到了由根模块 AppModule 导入的实例。 该构造函数检测到存在 parentModule ，于是抛出一个错误。
    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
        // # 打印看是否单例        
        if(this.ID)
        {
            console.log('CoreModule ID: ' + this.ID);
        }
        else
        {
            this.ID = new Date().getTime();
            console.log('Now created CoreModule ID: '+ this.ID);
        }

        // # 提醒开发者这是错误的操作代码
        if (parentModule) {
            throw new Error(
                'CoreModule is already loaded. Import it in the AppModule only');
        }
    }

    // # 配置服务
    static forRoot(config: UserServiceConfig): ModuleWithProviders {
        return {  // ModuleWithProviders对象
            ngModule: CoreModule,
            providers: [
                { provide: UserServiceConfig, useValue: config }
            ]
        };
    }
}

/**
 * # 关于CoreModule
 * + 从设计角度，CoreModule中的组件/指令/管道/服务只会创建一次，一般在根模块中导入创建
 * + 收集一些一次性组件。比如：加载动画、消息浮层和模态对话框等
 * + 
 */

/**
 * # 关于模块
 * 封装，隐藏细节 管理素材
 */