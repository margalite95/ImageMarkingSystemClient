import { TestBed } from '@angular/core/testing';

import { UnSubscribeUserService } from './un-subscribe-user.service';

describe('UnSubscribeUserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UnSubscribeUserService = TestBed.get(UnSubscribeUserService);
    expect(service).toBeTruthy();
  });
});
