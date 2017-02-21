import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { WOWHero }           from './WOWHero';

@Injectable()
export class HeroSearchService {
  constructor(private http: Http) {}
  search(term: string): Observable<WOWHero[]> {
    return this.http
               .get(`app/wowHeroes1/?name=${term}`)
               .map((r: Response) => r.json().data as WOWHero[]);
  }
}
