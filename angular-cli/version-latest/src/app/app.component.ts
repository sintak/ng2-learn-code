import { Component } from '@angular/core';

import { AccountService } from './services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works2!';

  constructor(accountS: AccountService) {
    this.title = accountS.getName();
  }
}
