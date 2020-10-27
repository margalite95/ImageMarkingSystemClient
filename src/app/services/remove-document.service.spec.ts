import { TestBed } from '@angular/core/testing';

import { RemoveDocumentService } from './remove-document.service';

describe('RemoveDocumentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RemoveDocumentService = TestBed.get(RemoveDocumentService);
    expect(service).toBeTruthy();
  });
});
