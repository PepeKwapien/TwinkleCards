import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionFormBodyComponent } from './collection-form-body.component';

describe('CollectionFormBodyComponent', () => {
  let component: CollectionFormBodyComponent;
  let fixture: ComponentFixture<CollectionFormBodyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CollectionFormBodyComponent]
    });
    fixture = TestBed.createComponent(CollectionFormBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
