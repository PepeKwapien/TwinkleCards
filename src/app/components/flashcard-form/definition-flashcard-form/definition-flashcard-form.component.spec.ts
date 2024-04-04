import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefinitionFlashcardFormComponent } from './definition-flashcard-form.component';

describe('DefinitionFlashcardFormComponent', () => {
  let component: DefinitionFlashcardFormComponent;
  let fixture: ComponentFixture<DefinitionFlashcardFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DefinitionFlashcardFormComponent]
    });
    fixture = TestBed.createComponent(DefinitionFlashcardFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
