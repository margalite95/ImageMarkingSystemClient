import { TestBed } from '@angular/core/testing';

import { CreateMarkerService } from './create-marker.service';

describe('CreateMarkerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CreateMarkerService = TestBed.get(CreateMarkerService);
    expect(service).toBeTruthy();
  });
});
