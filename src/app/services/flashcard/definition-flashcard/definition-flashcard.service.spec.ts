import { TestBed } from '@angular/core/testing';

import { DefinitionFlashcardService } from './definition-flashcard.service';

describe('DefinitionFlashcardService', () => {
  let service: DefinitionFlashcardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DefinitionFlashcardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
