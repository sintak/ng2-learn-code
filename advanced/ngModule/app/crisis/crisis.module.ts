import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';

import { CrisisListComponent }    from './crisis-list.component';
import { CrisisDetailComponent }  from './crisis-detail.component';
import { CrisisService } from './crisis.service';
import { routing }       from './crisis.routing';

import { ContactModule } from '../contact/contact.module';
import { CoreModule } from '../core/core.module';

@NgModule({
  imports:      [ CommonModule, routing, ContactModule, /*不应在此载入 CoreModule */],
  declarations: [ CrisisDetailComponent, CrisisListComponent ],
  providers:    [ CrisisService ]
})
export class CrisisModule {}


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/