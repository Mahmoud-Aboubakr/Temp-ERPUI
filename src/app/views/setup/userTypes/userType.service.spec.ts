import { TestBed } from '@angular/core/testing';

import { userTypesService } from './userType.service';

describe('userTypesService', () => {
  let service: userTypesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(userTypesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
