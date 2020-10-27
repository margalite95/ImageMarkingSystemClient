import { TestBed } from '@angular/core/testing';

import { GetMarkerService } from './get-marker.service';

describe('GetMarkerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetMarkerService = TestBed.get(GetMarkerService);
    expect(service).toBeTruthy();
  });
});
