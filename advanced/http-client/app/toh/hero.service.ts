import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Hero }           from './hero';
import { Observable }     from 'rxjs/Observable';
@Injectable()
export class HeroService {

    //   private heroesUrl = 'app/heroes.json';  // URL to JSON File
    private heroesUrl = 'app/heroes';  // URL to web API

    constructor(private http: Http) { }

    getHeroes(): Observable<Hero[]> {
        return this.http.get(this.heroesUrl)
            .map(this.extractData)
            .catch(this.handleError);
    }

    addHero(name: string): Observable<Hero> {
        let body = JSON.stringify({ name });
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.heroesUrl, body, options)
            .map(this.extractData)
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
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }

}
