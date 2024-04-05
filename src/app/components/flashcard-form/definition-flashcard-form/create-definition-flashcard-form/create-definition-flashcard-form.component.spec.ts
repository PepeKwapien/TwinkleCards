import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDefinitionFlashcardFormComponent } from './create-definition-flashcard-form.component';

describe('CreateDefinitionFlashcardFormComponent', () => {
  let component: CreateDefinitionFlashcardFormComponent;
  let fixture: ComponentFixture<CreateDefinitionFlashcardFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateDefinitionFlashcardFormComponent]
    });
    fixture = TestBed.createComponent(CreateDefinitionFlashcardFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
