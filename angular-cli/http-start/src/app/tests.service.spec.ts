/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TestsService } from './tests.service';

import { HttpModule } from '@angular/http'

describe('Service: Tests', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [TestsService]
    });
  });

  it('should ...', inject([TestsService], (service: TestsService) => {
    expect(service).toBeTruthy();
  }));

  it('得到777', inject([TestsService], (service: TestsService) => {
    expect(service.test1()).toEqual(777);
  }));

  it('获取http对象', inject([TestsService], (service: TestsService) => {
    expect(service.httpTest()).toBeTruthy();
  }));
});
