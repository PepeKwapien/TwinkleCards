import { TestBed } from '@angular/core/testing';

import { UserIdInterceptorService } from './user-id-interceptor.service';

describe('UserIdInterceptorService', () => {
  let service: UserIdInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserIdInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
