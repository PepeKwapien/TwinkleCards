import { TestBed } from '@angular/core/testing';

import { TranslationFlashcardService } from './translation-flashcard.service';

describe('TranslationFlashcardService', () => {
  let service: TranslationFlashcardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TranslationFlashcardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
