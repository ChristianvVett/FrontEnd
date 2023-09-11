import { TestBed } from '@angular/core/testing';

import { GetMethodsService } from './get-methods.service';

describe('GetMethodsService', () => {
  let service: GetMethodsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetMethodsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
