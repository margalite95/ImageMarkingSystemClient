import { TestBed } from '@angular/core/testing';

import { RemoveShareDocumentsServiceService } from './remove-share-documents-service.service';

describe('RemoveShareDocumentsServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RemoveShareDocumentsServiceService = TestBed.get(RemoveShareDocumentsServiceService);
    expect(service).toBeTruthy();
  });
});
