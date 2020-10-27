import { TestBed } from '@angular/core/testing';

import { GetSharedUsersService } from './get-shared-users.service';

describe('GetSharedUsersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetSharedUsersService = TestBed.get(GetSharedUsersService);
    expect(service).toBeTruthy();
  });
});
