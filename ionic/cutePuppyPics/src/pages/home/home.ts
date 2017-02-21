import { Component, ViewChild, ElementRef } from '@angular/core';

import { NavController } from 'ionic-angular';

declare var AMap: any;
// declare var fc;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('container') mapElement: ElementRef;
  @ViewChild('tip') tipElement: ElementRef;
  tip: any;

  constructor(public navCtrl: NavController) {
  }

  ionViewDidLoad() {
    console.log('Hello AMap Page');
    this.loadMap1();
  }

  loadMap2() {
    var map = new AMap.Map(this.mapElement.nativeElement);          // 创建地图实例
    map.setZoom(10);
    map.setCenter([116.39, 39.9]);
    map.centerAndZoom(new AMap.Point(113.402364, 23.056676), 16); //显示中心
    var marker = new AMap.Marker();
    marker.setMap(map);
  }

  loadMap1() {

    var map = new AMap.Map(/*'container'*/this.mapElement.nativeElement, {
      zoom: 10,
      center: [116.39, 39.9]//new AMap.LngLat(116.39,39.9)
    });
    map.setZoom(15);
    map.setCenter([113.385772, 23.180886]);
    console.log(map.getZoom());

    var lngLat = new AMap.LngLat(113.396458, 23.167787);

    // 点标记的创建与添加
    var marker = new AMap.Marker({
      position: lngLat,
      map: map
    });
    // marker.setMap();

    // 信息窗体的创建与设定
    var infowindow = new AMap.InfoWindow({
      content: '<h3>高德地图</h3><div>高德是中国领先的数字地图内容、导航和位置服务解决方案提供商。</div>',
      offset: new AMap.Pixel(0, -30),
      size: new AMap.Size(230, 0)
    })

    infowindow.open(map, lngLat);
    // // 也可以通过事件监听，在需要的时候才将信息窗体显示出来, 比如在marker被单击的时候显示
    // var clickHandle = AMap.event.addListener(marker, 'click', function () {
    //     infowindow2.open(map, marker.getPosition())
    // });
    var geolocation;
    AMap.plugin(['AMap.ToolBar'/*, 'AMap.Scale'*/, 'AMap.Geolocation'], () => {
      var toolBar = new AMap.ToolBar();
      // var scale = new AMap.Scale();
      map.addControl(toolBar);
      // map.addControl(scale);

      // 'AMap.Geolocation'
      geolocation = new AMap.Geolocation({
        enableHighAccuracy: true,//是否使用高精度定位，默认:true
        timeout: 10000,          //超过10秒后停止定位，默认：无穷大
        maximumAge: 0,           //定位结果缓存0毫秒，默认：0
        convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
        showButton: true,        //显示定位按钮，默认：true
        buttonPosition: 'LB',    //定位按钮停靠位置，默认：'LB'，左下角
        buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
        showMarker: true,        //定位成功后在定位到的位置显示点标记，默认：true
        showCircle: true,        //定位成功后用圆圈表示定位精度范围，默认：true
        panToLocation: true,     //定位成功后将定位到的位置作为地图中心点，默认：true
        zoomToAccuracy: true      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
      });
      map.addControl(geolocation);
      AMap.event.addListener(geolocation, 'complete', this.onComplete);//返回定位信息
      AMap.event.addListener(geolocation, 'error', this.onError);      //返回定位出错信息
    });
    // map.removeControl(toolBar);
  }

  onComplete(msg) {
    alert('Complete: ' + JSON.stringify(msg));
  }

  onError(msg) {
    alert('Error: ' + JSON.stringify(msg));
  }
}
