import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  private userAgent: string;

  constructor(public navCtrl: NavController) {

  }

  ngOninit() {
    console.log('AboutPage ngOninit()');
  }

  ionViewDidLoad() {
    console.log('AboutPage ionViewDidLoad');
    this.userAgent = navigator.userAgent;
    // navigator.geolocation.getCurrentPosition();
  }
}
