import { Injectable } from '@angular/core';
import { Jsonp, URLSearchParams } from '@angular/http';  // Jsop: Angular 的 Jsonp 服务不但通过 JSONP 扩展了 Http 服务，而且限制我们只能用 GET 请求。 尝试调用所有其它 HTTP 方法都将抛出一个错误，因为 JSONP 是只读的。

@Injectable()
export class WikipediaService {
    constructor(private jsonp: Jsonp) { }
    search(term: string) {
        // # 手工构造搜索字符串
        // let queryString =
        //     `?search=${term}&action=opensearch&format=json&callback=JSONP_CALLBACK`;

        let wikiUrl = 'http://en.wikipedia.org/w/api.php';
        let params = new URLSearchParams();
        params.set('search', term); // the user's search value
        params.set('action', 'opensearch');
        params.set('format', 'json');
        params.set('callback', 'JSONP_CALLBACK');  // JSONP_CALLBACK: angular内部提供的函数。试试改为console.log可看到有趣的东西
        // TODO: Add error handling
        return this.jsonp
            .get(wikiUrl, { search: params })
            .map(response => <string[]>response.json()[1]);
    }
}
