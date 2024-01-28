import { TestBed } from '@angular/core/testing';

import { unitsService } from './units.service';

describe('unitsService', () => {
  let service: unitsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(unitsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
