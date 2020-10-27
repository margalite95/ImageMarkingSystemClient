import { TestBed } from '@angular/core/testing';

import { HedearService } from './hedear.service';

describe('HedearService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HedearService = TestBed.get(HedearService);
    expect(service).toBeTruthy();
  });
});
