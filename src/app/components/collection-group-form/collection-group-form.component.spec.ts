import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionGroupFormComponent } from './collection-group-form.component';

describe('CollectionGroupFormComponent', () => {
  let component: CollectionGroupFormComponent;
  let fixture: ComponentFixture<CollectionGroupFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CollectionGroupFormComponent]
    });
    fixture = TestBed.createComponent(CollectionGroupFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
