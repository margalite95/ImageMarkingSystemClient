import { TestBed } from '@angular/core/testing';

import { GetReciversDocsService } from './get-recivers-docs.service';

describe('GetReciversDocsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetReciversDocsService = TestBed.get(GetReciversDocsService);
    expect(service).toBeTruthy();
  });
});
