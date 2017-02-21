import { Injectable, Optional } from '@angular/core';

let nextId = 1;

/**
 * # 配置类
 * 放一些參數，这样就可以在通过创建服务的时候对该服务实行定制了（通过CoreModule类或UserService类自己的静态函数）
 */
export class UserServiceConfig {
  userName = 'Philip Marlowe';
}

@Injectable()
export class UserService {
  id = nextId++;
  private _userName = 'Sherlock Holmes';

  constructor(@Optional() config: UserServiceConfig) {  // @Optional()表示可选
    if (config) { this._userName = config.userName; }
  }

  get userName() {
    // Demo: add a suffix if this service has been created more than once
    const suffix = this.id > 1 ? ` times ${this.id}` : '';
    return this._userName + suffix;
  }
}
