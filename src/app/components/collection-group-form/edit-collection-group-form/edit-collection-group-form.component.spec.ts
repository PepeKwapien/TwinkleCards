import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCollectionGroupFormComponent } from './edit-collection-group-form.component';

describe('EditCollectionGroupFormComponent', () => {
  let component: EditCollectionGroupFormComponent;
  let fixture: ComponentFixture<EditCollectionGroupFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditCollectionGroupFormComponent]
    });
    fixture = TestBed.createComponent(EditCollectionGroupFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
