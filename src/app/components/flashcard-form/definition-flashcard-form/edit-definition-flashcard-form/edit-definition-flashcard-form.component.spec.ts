import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDefinitionFlashcardFormComponent } from './edit-definition-flashcard-form.component';

describe('EditDefinitionFlashcardFormComponent', () => {
  let component: EditDefinitionFlashcardFormComponent;
  let fixture: ComponentFixture<EditDefinitionFlashcardFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditDefinitionFlashcardFormComponent]
    });
    fixture = TestBed.createComponent(EditDefinitionFlashcardFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
