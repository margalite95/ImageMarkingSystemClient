import { TestBed } from '@angular/core/testing';

import { CreateDocumentService } from './create-document.service';

describe('CreateDocumentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CreateDocumentService = TestBed.get(CreateDocumentService);
    expect(service).toBeTruthy();
  });
});
