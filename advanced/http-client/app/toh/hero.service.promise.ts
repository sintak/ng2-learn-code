// Promise Version
import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Hero }           from './hero';
// import { Observable }     from 'rxjs/Observable';

@Injectable()
export class HeroService {

    private heroesUrl = 'app/heroes.xxx';  // URL to File。使用文件来源的话，不要在根模块中InMemoryWebApiModule.forRoot(T)。
                                // 当使用内存api时，url字符串文件名会被自动去掉后缀，然后和内存api的数据对比识别，如'app/heroes.xxx'会被识别为app/heroes
    // private heroesUrl = 'app/heroesXXX';  // URL to web API

    constructor(private http: Http) { }

    getHeroes(): Promise<Hero[]> {
        return this.http.get(this.heroesUrl)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

    addHero(name: string): Promise<Hero> {
        let body = JSON.stringify({ name });
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.heroesUrl, body, options)
            .toPromise()  // toPromise(success, fail) 或 then.catch
            .then(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        let body = res.json();
        return body.data || {};
    }
    
    private handleError(error: any) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';  // 字符串插值
        console.error(errMsg); // log to console instead
        return Promise.reject(errMsg);

    }
}
