import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  msg: string = '';

  constructor(public navCtrl: NavController) {
    let a = 78;
    let b = "hello";
    this.msg += `${b} ${a}\n`;
    this.msg += navigator.userAgent + '\n';
  }

}
