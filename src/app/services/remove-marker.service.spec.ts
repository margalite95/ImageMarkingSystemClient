import { TestBed } from '@angular/core/testing';

import { RemoveMarkerService } from './remove-marker.service';

describe('RemoveMarkerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RemoveMarkerService = TestBed.get(RemoveMarkerService);
    expect(service).toBeTruthy();
  });
});
