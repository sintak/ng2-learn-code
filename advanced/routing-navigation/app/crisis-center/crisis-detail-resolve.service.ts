import { Injectable }             from '@angular/core';
import { Router, Resolve,
         ActivatedRouteSnapshot } from '@angular/router';

import { Crisis, CrisisService } from './crisis.service';

/**
 * 使用resolve来实现: 让它先解析必要的危机，再加载路由。或者当用户导航到一个无效的危机 :id 时，将它们导航回危机列表。
 * 一个 CrisisDetailResolve 服务，用它来处理 Crisis 数据读取和在 Crisis 不存在时将用户导航出去。 
 * 然后可以确保当激活 CrisisDetailComponent 时，关联的 Crisis 已经为显示准备妥当。
 */
@Injectable()
export class CrisisDetailResolve implements Resolve<Crisis> {
  constructor(private cs: CrisisService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Promise<Crisis>|boolean {
    let id = +route.params['id'];

    return this.cs.getCrisis(id).then(crisis => {
      if (crisis) {
        return crisis;
      } else { // id not found
        this.router.navigate(['/crisis-center']);
        return false;
      }
    });
  }
}


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/