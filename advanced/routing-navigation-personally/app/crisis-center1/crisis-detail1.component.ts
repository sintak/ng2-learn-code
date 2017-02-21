import {
    Component, OnInit, HostBinding,
    trigger, transition,
    animate, style, state
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Crisis } from './crisis1.service';
import { DialogService }  from '../shared/dialog.service';

import { CanComponentDeactivate } from '../shared/can-deactivate-guard.service';

@Component({
    moduleId: module.id,
    templateUrl: 'crisis-detail1.component.html'
})
export class CrisisDetail1Component implements OnInit, CanComponentDeactivate {

    crisis: Crisis;
    editName: string;
    editNameTmp: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private dialogService: DialogService
    ) { }

    ngOnInit(): void {
        // # 根据从url传过来的id获取具体信息

        this.route.data.forEach((data: { crisis: Crisis }) => {  // data由路由的resolve提供
            this.editName = data.crisis.name;
            this.crisis = data.crisis;

            this.editNameTmp = this.editName; 
        });
    }

    canDeactivate(): Promise<boolean> | boolean {
        // 检查是否已修改：文本框中的值是否和暂存的值一致
        if (this.editName === this.editNameTmp)
        {
            // 没更改，可以直接退出此导航地址
            return true;
        }

        return this.dialogService.confirm('是否放弃更改：\n' 
                + this.editNameTmp + ' -> ' + this.editName);
    }

    cancel(): void {
        this.gotoCrises();
    }

    save(): void {
        this.crisis.name = this.editName;  // 引用
        this.gotoCrises();
    }

    gotoCrises(): void {
        let crisisId = this.crisis ? this.crisis.id : null;

        this.router.navigate(['../', { id: crisisId, foo: 'foo' }], { relativeTo: this.route });
    }
}