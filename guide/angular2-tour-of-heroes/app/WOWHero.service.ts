import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';  // 从 RxJS 库中导入 operator扩展toPromise

import { WOWHero } from './WOWHero';
import { HEROES } from './mock-wowheroes';


@Injectable()  // @Injectable() 标志着一个类可以被一个注入器实例化。
export class WOWHeroService {
    private wowHeroesUrl = 'app/wowHeroes1';  // URL to web api  疑问：是怎么对应上in-memory-data.service.ts文件中的wowHeroes1数组的呢？
    serviceID: string;

    constructor(private http: Http) {
        this.serviceID = new Date().getTime().toString();
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

    private getWOWHeroesFromDB(): Promise<WOWHero[]> {
        return this.http.get(this.wowHeroesUrl)
                .toPromise()
                .then(response => response.json().data as WOWHero[])
                .catch(this.handleError);
    }

    getWOWHeros1(): WOWHero[] {
        return HEROES;
    }
    getWOWHeros(): Promise<WOWHero[]> {
        // return Promise.resolve(HEROES);
        //return this.getWOWHerosSlowly();
        return this.getWOWHeroesFromDB();
    }

    private getWOWHerosSlowly(): Promise<WOWHero[]> {
        //this.sleep(10000);
        // return Promise.resolve(HEROES);  // 创建一个Promise
        return new Promise<WOWHero[]>(resolve => setTimeout(() => resolve(HEROES), 0));  // 0 seconds
    }

    getWOWHeroById(id: number): Promise<WOWHero> {
        return this.getWOWHeros().then(wowHeroes => wowHeroes.find(wowHero => wowHero.id === id));
    }

    // Add new Hero
    private post(hero: WOWHero): Promise<WOWHero> {
        let headers = new Headers({
            'Content-Type': 'application/json'
        });

        return this.http
            .post(this.wowHeroesUrl, JSON.stringify(hero), { headers: headers })
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }

    // Update existing Hero
    private put(hero: WOWHero): Promise<WOWHero> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        let url = `${this.wowHeroesUrl}/${hero.id}`;

        return this.http
            .put(url, JSON.stringify(hero), { headers: headers })
            .toPromise()
            .then(() => hero)
            .catch(this.handleError);
    }

    delete(hero: WOWHero): Promise<Response> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        let url = `${this.wowHeroesUrl}/${hero.id}`;

        return this.http
            .delete(url, { headers: headers })
            .toPromise()
            .catch(this.handleError);
    }

    save(hero: WOWHero): Promise<WOWHero> {
        if (hero.id) {
            return this.put(hero);
        }
        return this.post(hero);
    }


    private sleep(sleepTime: number) {
        for (var start = Date.now(); Date.now() - start <= sleepTime;) { }
    }


}
