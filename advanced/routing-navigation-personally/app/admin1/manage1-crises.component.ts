import { Component } from '@angular/core';

@Component({
    moduleId: module.id,  // 要给id，否则没有id的话angular就默认到根目录去找templateUrl指定的文件，结果找不到
    templateUrl: 'manage1-crises.component.html'
})
export class Manage1CrisesComponent {}