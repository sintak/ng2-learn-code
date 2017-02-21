import { InMemoryDbService } from 'angular2-in-memory-web-api';
export class HeroData implements InMemoryDbService {
  createDb() {
    let heroes = [
      {id: 11, name: 'Mr. Nice'},
      {id: 12, name: 'Narco'},
      {id: 13, name: 'Bombasto'},
      {id: 14, name: 'Celeritas'},
      {id: 15, name: 'Magneta'},
      {id: 16, name: 'RubberMan'},
      {id: 17, name: 'Dynama'},
      {id: 18, name: 'Dr IQ'},
      {id: 19, name: 'Magma'},
      {id: 20, name: 'Tornado'}
    ];
    return {heroes};
  }
}

/**
 * # 使用angular2-in-memory-web-api步骤：
 * 1.创建类型实现InMemoryDbService，即可注入到根模块
 * 2.把url端点指向createDb返回的对象属性，格式如'app/对象字段名称'
 */