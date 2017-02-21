import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';  // 
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Component({
    moduleId: module.id,
    templateUrl: 'admin1-dashboard.component.html'
})
export class Admin1DashboardComponent implements OnInit {
    sessionId: Observable<string>;
    token: Observable<string>;

    constructor(private route: ActivatedRoute) {}

    ngOnInit(): void {
        // # 获取url传过来的值 =>apple
        this.sessionId = 
            this.route.queryParams.map(params => params['session_iddddd'] || 'None');
        this.token =
            this.route.fragment.map(fragment => fragment || 'None');
    }
}
