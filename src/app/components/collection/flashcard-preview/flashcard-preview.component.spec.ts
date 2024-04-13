import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlashcardPreviewComponent } from './flashcard-preview.component';

describe('FlashcardPreviewComponent', () => {
  let component: FlashcardPreviewComponent;
  let fixture: ComponentFixture<FlashcardPreviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FlashcardPreviewComponent]
    });
    fixture = TestBed.createComponent(FlashcardPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
