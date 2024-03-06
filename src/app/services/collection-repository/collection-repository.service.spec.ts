import { TestBed } from '@angular/core/testing';

import { CollectionRepositoryService } from './collection-repository.service';

describe('CollectionRepositoryService', () => {
  let service: CollectionRepositoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CollectionRepositoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
