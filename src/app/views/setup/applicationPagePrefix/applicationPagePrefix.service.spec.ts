import { TestBed } from '@angular/core/testing';

import { ApplicationPagePrefixService } from './applicationPagePrefix.service';

describe('ApplicationPagePrefixServiceService', () => {
  let service: ApplicationPagePrefixService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApplicationPagePrefixService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
