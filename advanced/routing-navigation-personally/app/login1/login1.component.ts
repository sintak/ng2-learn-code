import { Component, Input } from '@angular/core';

import { Router, NavigationExtras } from '@angular/router';

import { Auth1Service } from '../shared/auth1.service';

@Component({
    moduleId: module.id,
    templateUrl: 'login1.component.html'
})
export class Login1Component {
    message: string;


    constructor(private router: Router, private auth1Service: Auth1Service) {
    }
    
    setMessage() {
        this.message = this.auth1Service.isLoggedIn ? '已登录': '未登录';
    }

    login() {
        // 进行登录动作
        this.message = '尝试登录中。。。';

        this.auth1Service.login().subscribe(() => {
            this.setMessage();

            if(this.auth1Service.isLoggedIn)
            {
                // 已经登录，重定位到指定位置
                let redirect = this.auth1Service.redirectUrl ? this.auth1Service.redirectUrl : '/admin-1';

                let navigationExtras: NavigationExtras = {
                    preserveQueryParams: true,  // 跳转时是否保留已有的QueryParams
                    preserveFragment: true  // 跳转时是否保留已有的Fragment
                };

                // 导航到指定地址并附带值 $apple
                this.router.navigate([redirect], navigationExtras);
            }
            
        });
    }

    logout() {
        this.auth1Service.logout();
        this.setMessage();
    }
}
