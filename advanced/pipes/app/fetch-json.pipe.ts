import { Pipe, PipeTransform } from '@angular/core';
import { Http }                from '@angular/http';

@Pipe({
  name: 'fetch',
  pure: false
})
export class FetchJsonPipe  implements PipeTransform {
  // private fetchedJson: any = null;
  // private prevUrl = '';
  private static fetchedJson: any = null;
  private static prevUrl = '';

  constructor(private _http: Http) { console.log('FetchJsonPipe created');}  // 每次使用管道都会创建该管道，注意保存管道的局部变量或使用静态变量。

  transform(url: string): any {
    if (url !== FetchJsonPipe.prevUrl) {
      // this.prevUrl = url;
      // this.fetchedJson = null;
      FetchJsonPipe.prevUrl = url;
      FetchJsonPipe.fetchedJson = null;
      this._http.get(url)
        .map( result => result.json() )
        // .subscribe( result => this.fetchedJson = result );
        .subscribe( result => FetchJsonPipe.fetchedJson = result );
    }

    return FetchJsonPipe.fetchedJson;
  }
}

/**
 * # 一个非纯而且带缓存的管道
 * 一个向服务器发起 HTTP 请求的管道。 这通常是一个可怕的主意。 不管我们怎么做，估计它都会是一个可怕的主意。 
 * 但即便如此，为了讲解这个技术点，我们还是写一个吧。 时刻记住，非纯管道可能每隔几微秒就会被调用一次。 
 * 如果我们不小心点，这个管道就会发起一大堆请求“攻击”服务器。
 * 我们确实得小心点。所以这个管道只有当所请求的 URL 发生变化时才会向服务器发起请求。 它会缓存这个请求的 URL ，
 * 并等待一个结果，当结果发回来时，就缓存它。 以后每当 Angular 调用此管道时，
 * 它都会返回这个缓存的结果 ( 当请求尚未返回时，此结果是空 ) ，只在必要时才会去联系服务器。
 */

/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/