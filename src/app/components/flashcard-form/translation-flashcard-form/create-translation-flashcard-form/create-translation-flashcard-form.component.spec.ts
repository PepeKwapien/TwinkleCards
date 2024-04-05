import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTranslationFlashcardFormComponent } from './create-translation-flashcard-form.component';

describe('CreateTranslationFlashcardFormComponent', () => {
  let component: CreateTranslationFlashcardFormComponent;
  let fixture: ComponentFixture<CreateTranslationFlashcardFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateTranslationFlashcardFormComponent]
    });
    fixture = TestBed.createComponent(CreateTranslationFlashcardFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
