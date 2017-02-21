import { Injectable } from '@angular/core';
import {
    CanActivate, Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    CanActivateChild,
    NavigationExtras,
    CanLoad, Route
} from '@angular/router';

import { Auth1Service } from './shared/auth1.service';

/**
 * 在*.routing.ts中使用路由守卫
 */
@Injectable()
export class AuthGuard1 implements CanLoad, CanActivate, CanActivateChild {
    constructor(private auth1Service: Auth1Service, private router: Router) { }

    /**
     * canLoad： 守卫加载特性区 => *.routing.ts
     */
    canLoad(route: Route): /*Observable<boolean> | Promise<boolean> |*/ boolean {
        console.log('AuthGuard1 > canLoad()');
        let url = `/${route.path}`;
        return this.checkLogin(url);
    }

    /**
     * canActivate: 守卫加载组件 => *.routing.ts
     */
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): /*Observable<boolean> | Promise<boolean> | */boolean {

        // # 一般情况下守卫加载组件，检查url即可
        // return false;
        let url: string = state.url;
        let isLogged = this.checkLogin(url);
        console.log('AuthGuard1 > canActivate() isLogged:' + isLogged);
        return isLogged;
    }

    /**
     * canActivateChild： 守卫加载子组件 => *.routing.ts
     */
    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): /*Observable<boolean> | Promise<boolean> | */boolean {
        // return false;
        return this.canActivate(childRoute, state);
    }


    /**
     * 
     * url: 要保存的地址以便将来回跳
     */
    checkLogin(url: string): boolean {
        // 如果验证通过，跳转到管理界面
        if (this.auth1Service.isLoggedIn) return true;

        // # 如果验证不过，保存当前url（以便将来登录后回跳），然后跳转到登录页面
        this.auth1Service.redirectUrl = url;
        console.log('checkLogin() url: ' + url);

        // # 查询参数与片段
        //   查询参数目的是通过url向服务器传递自己的意图
        // 设计上，在这路由守卫登录检测这里做url传值动作
        let sessionId = '123ABC456';

        let navigationExtras: NavigationExtras = {
            queryParams: { 'session_iddddd': sessionId },
            fragment: 'anchorrrrrrr'
        };

        this.router.navigate(['/login-1'], navigationExtras);  // 导航到另一个位置，把额外数据传进去

        return false;
    }
}