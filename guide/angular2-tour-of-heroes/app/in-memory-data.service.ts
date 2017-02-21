import { InMemoryDbService } from 'angular2-in-memory-web-api';
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    let wowHeroes1 = [
      {id: 11, name: 'Mr. Nice2'},
      {id: 12, name: 'Narco2'},
      {id: 13, name: 'Bombasto2'},
      {id: 14, name: 'Celeritas2'},
      {id: 15, name: 'Magneta2'},
      {id: 16, name: 'RubberMan2'},
      {id: 17, name: 'Dynama2'},
      {id: 18, name: 'Dr IQ2'},
      {id: 19, name: 'Magma2'},
      {id: 20, name: 'Tornado2'}
    ];
    return {wowHeroes1};
  }
}
