import { TestBed } from '@angular/core/testing';

import { EditColorsService } from './edit-colors.service';

describe('EditColorsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EditColorsService = TestBed.get(EditColorsService);
    expect(service).toBeTruthy();
  });
});
