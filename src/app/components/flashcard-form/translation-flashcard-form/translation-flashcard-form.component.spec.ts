import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslationFlashcardFormComponent } from './translation-flashcard-form.component';

describe('TranslationFlashcardFormComponent', () => {
  let component: TranslationFlashcardFormComponent;
  let fixture: ComponentFixture<TranslationFlashcardFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TranslationFlashcardFormComponent]
    });
    fixture = TestBed.createComponent(TranslationFlashcardFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
