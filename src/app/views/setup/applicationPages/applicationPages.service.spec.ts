import { TestBed } from '@angular/core/testing';

import { ApplicationPagesService} from './applicationPages.service';

describe('ApplicationPagesService', () => {
  let service: ApplicationPagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApplicationPagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
