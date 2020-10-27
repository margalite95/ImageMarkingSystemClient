import { TestBed } from '@angular/core/testing';

import { GetDocumentsService } from './get-documents.service';

describe('GetDocumentsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetDocumentsService = TestBed.get(GetDocumentsService);
    expect(service).toBeTruthy();
  });
});
