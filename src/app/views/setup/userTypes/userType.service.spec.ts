import { TestBed } from '@angular/core/testing';

import { NationalityService } from './userType.service';

describe('NationalityService', () => {
  let service: NationalityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NationalityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
