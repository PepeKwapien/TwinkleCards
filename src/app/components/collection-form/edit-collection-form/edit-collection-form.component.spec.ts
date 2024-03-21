import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCollectionFormComponent } from './edit-collection-form.component';

describe('EditCollectionFormComponent', () => {
  let component: EditCollectionFormComponent;
  let fixture: ComponentFixture<EditCollectionFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditCollectionFormComponent]
    });
    fixture = TestBed.createComponent(EditCollectionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
