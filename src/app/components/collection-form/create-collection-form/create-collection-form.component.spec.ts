import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCollectionFormComponent } from './create-collection-form.component';

describe('CreateCollectionFormComponent', () => {
  let component: CreateCollectionFormComponent;
  let fixture: ComponentFixture<CreateCollectionFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateCollectionFormComponent]
    });
    fixture = TestBed.createComponent(CreateCollectionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
