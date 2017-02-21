import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import generateUUID from "../utils/uuid";

/*
  Generated class for the GeofenceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class GeofenceProvider {

  // private geofences: Geofence[];

  constructor(public http: Http) {
    console.log('Hello GeofenceProvider Provider');
  }

  //   create(attributes) {
  //   const defaultGeofence = {
  //     id: generateUUID(),
  //     latitude: 50,
  //     longitude: 50,
  //     radius: 1000,
  //     transitionType: window.TransitionType.ENTER,
  //     notification: {
  //       id: this.getNextNotificationId(),
  //       title: "Ionic geofence example",
  //       text: "",
  //       icon: "res://ic_menu_mylocation",
  //       openAppOnClick: true,
  //     },
  //   };

  //   return Object.assign(defaultGeofence, attributes);
  // }

}
