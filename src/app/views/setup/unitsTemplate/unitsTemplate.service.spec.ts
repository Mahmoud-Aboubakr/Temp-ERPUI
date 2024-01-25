import { TestBed } from '@angular/core/testing';

import { unitsTemplateService } from './unitsTemplate.service';

describe('unitsTemplateService', () => {
  let service: unitsTemplateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(unitsTemplateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
