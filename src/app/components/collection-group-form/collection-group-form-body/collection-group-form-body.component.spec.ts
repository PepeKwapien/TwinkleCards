import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionGroupFormBodyComponent } from './collection-group-form-body.component';

describe('CollectionGroupFormBodyComponent', () => {
  let component: CollectionGroupFormBodyComponent;
  let fixture: ComponentFixture<CollectionGroupFormBodyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CollectionGroupFormBodyComponent]
    });
    fixture = TestBed.createComponent(CollectionGroupFormBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
