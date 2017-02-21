import { Component, OnInit } from '@angular/core';

// import { TestService } from './test.service';

import { Cookie } from 'ng2-cookies/ng2-cookies';

@Component({
  selector: 'app-root1',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
  // , providers: [TestService]
})
export class AppComponent implements OnInit {
  title = 'app works!';

  // constructor(service: TestService) {
  //   service.get();
  // }

  ngOnInit(): void {
    Cookie.set('cookieName12', 'cookieValueAB');
    Cookie.set('cookieName34', 'cookieValueCD', 10 /*days from now*/);
    Cookie.set('cookieName56', 'cookieValueEF', 10, '/myapp/', 'mydomain.com');

    let myCookie34 = Cookie.get('cookieName34');
    console.log(myCookie34);
    let myCookie56 = Cookie.get('cookieName56');
    console.log(myCookie56);
    console.log('---------');

    /*
    * List of cookies as Object, like: { cookieName: "cookieValue", cookieName2: "cookieValue2" ... etc }
    */
    let cookielist = Cookie.getAll();
    console.log(cookielist);
    for(let cookie in cookielist)
    {
      console.log(cookie);
    }
    console.log('---------');

    Cookie.delete('cookieName34');
    let cookielist1 = Cookie.getAll();
    console.log(cookielist1);
    for(let cookie in cookielist1)
    {
      console.log(cookie);
    }
    console.log('---------');

    Cookie.deleteAll();
    let cookielist2 = Cookie.getAll();
    console.log(cookielist2);
    for(let cookie of cookielist2)
    {
      console.log(cookie);
    }
    console.log('---------');
  }
}
