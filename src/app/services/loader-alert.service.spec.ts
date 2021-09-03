import { TestBed } from '@angular/core/testing';

import { LoaderAlertService } from './loader-alert.service';

describe('LoaderAlertService', () => {
  let service: LoaderAlertService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoaderAlertService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
