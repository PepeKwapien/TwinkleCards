import { TestBed } from '@angular/core/testing';

import { CollectionGroupFormService } from './collection-group-form.service';

describe('CollectionGroupFormService', () => {
  let service: CollectionGroupFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CollectionGroupFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
