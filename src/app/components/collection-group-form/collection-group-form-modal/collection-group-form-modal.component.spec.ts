import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionGroupFormModalComponent } from './collection-group-form-modal.component';

describe('CollectionGroupFormModalComponent', () => {
  let component: CollectionGroupFormModalComponent;
  let fixture: ComponentFixture<CollectionGroupFormModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CollectionGroupFormModalComponent]
    });
    fixture = TestBed.createComponent(CollectionGroupFormModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
