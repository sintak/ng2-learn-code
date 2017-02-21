import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrisisCenter1Component } from './crisis-center1.component';
import { CrisisList1Component } from './crisis-list1.component';
import { CrisisCenterHome1Component } from './crisis-center-home1.component';
import {CrisisDetail1Component} from './crisis-detail1.component';

import { CrisisDetailResolve1 } from './crisis-detail-resolve1.service';

import { CanDeactivateGuard } from '../shared/can-deactivate-guard.service';

export const routing: ModuleWithProviders = RouterModule.forChild([
    // { path: 'crisis-center1', component: CrisisCenter1Component }
    { path: '', redirectTo: 'crisis-center1', pathMatch: 'full'},
    {
        path: 'crisis-center1',
        component: CrisisCenter1Component,
        children: [  // 装载到CrisisCenter1Component的<router-outlet></router-outlet>
            {
                path: '',
                component: CrisisList1Component,
                children: [  // 装载到CrisisList1Component的<router-outlet></router-outlet>
                    {
                        path: '', 
                        component: CrisisCenterHome1Component 
                    },
                    {
                        path: ':id', 
                        component: CrisisDetail1Component,  // 该component中实现了CanDeactivate<T>接口的T接口
                        resolve: {
                            crisis: CrisisDetailResolve1
                        },
                        canDeactivate: [ CanDeactivateGuard ]  // 从该路由地址退出的限制。要通过该接口达到目的，注意在对应的该component中实现接口
                    }
                ]
            }
        ]
    }
]);