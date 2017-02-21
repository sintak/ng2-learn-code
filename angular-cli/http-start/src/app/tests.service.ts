import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class TestsService {

  constructor(private http: Http) { }

  test1(): number {
    return 777;
  }

  httpTest(): any {
    return this.http;
  }

}
