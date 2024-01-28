import { TestBed } from '@angular/core/testing';

import { storeAdjustmentService } from './storeAdjustment.service';

describe('storeAdjustmentService', () => {
  let service: storeAdjustmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(storeAdjustmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
