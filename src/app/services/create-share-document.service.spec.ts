import { TestBed } from '@angular/core/testing';

import { CreateShareDocumentService } from './create-share-document.service';

describe('CreateShareDocumentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CreateShareDocumentService = TestBed.get(CreateShareDocumentService);
    expect(service).toBeTruthy();
  });
});
