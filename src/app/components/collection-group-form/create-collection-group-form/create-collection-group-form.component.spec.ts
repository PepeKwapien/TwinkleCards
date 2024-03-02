import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCollectionGroupFormComponent } from './create-collection-group-form.component';

describe('CreateCollectionGroupFormComponent', () => {
  let component: CreateCollectionGroupFormComponent;
  let fixture: ComponentFixture<CreateCollectionGroupFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateCollectionGroupFormComponent]
    });
    fixture = TestBed.createComponent(CreateCollectionGroupFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
