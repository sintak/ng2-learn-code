import { Injectable } from '@angular/core';
import {
    Router, Resolve,
    ActivatedRouteSnapshot, RouterStateSnapshot
} from '@angular/router';

import { Crisis, Crisis1Service } from './crisis1.service';

/**
 * 用 Resolve 在路由激活 之前 获取路由数据。
 */
@Injectable()
export class CrisisDetailResolve1 implements Resolve<Crisis> {
    constructor(private cs: Crisis1Service, private router: Router) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):/* Observable<any> | */ Promise<Crisis> | any {
        let id = +route.params['id'];

        return this.cs.getCrisis(id).then(crisis => {
            if(crisis) {
                return crisis;
            }
            else {
                this.router.navigate(['/crisis-center-1']);
                return false;
            }
        });
    }
}