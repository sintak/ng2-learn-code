import { Component, OnInit } from '@angular/core';

import { Crisis, CrisisService }     from './crisis.service';

import { UserService } from '../core/user.service';
import { TestService } from '../shared/test.service';

@Component({
  template: `
    <h3 highlight>Crisis List</h3>
    <div *ngFor='let crisis of crisises | async'>
      <a routerLink="{{'../' + crisis.id}}">{{crisis.id}} - {{crisis.name}}</a>
    </div>
  `
})
export class CrisisListComponent implements OnInit {
  crisises: Promise<Crisis[]>;

  constructor(private crisisService: CrisisService, private userService: UserService, private testService: TestService) { }

  ngOnInit() {
    this.crisises = this.crisisService.getCrises();
    this.test();
  }

  // # 测试使用CoreModule和ContactModule
  test(): void {
    console.log('userService output:' + this.userService.userName);
    console.log('testService output:' + this.testService.toString());
  }
}


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/