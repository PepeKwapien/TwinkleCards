import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTranslationFlashcardFormComponent } from './edit-translation-flashcard-form.component';

describe('EditTranslationFlashcardFormComponent', () => {
  let component: EditTranslationFlashcardFormComponent;
  let fixture: ComponentFixture<EditTranslationFlashcardFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditTranslationFlashcardFormComponent]
    });
    fixture = TestBed.createComponent(EditTranslationFlashcardFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
