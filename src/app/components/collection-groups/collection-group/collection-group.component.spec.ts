import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionGroupComponent } from './collection-group.component';

describe('CollectionGroupComponent', () => {
  let component: CollectionGroupComponent;
  let fixture: ComponentFixture<CollectionGroupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CollectionGroupComponent]
    });
    fixture = TestBed.createComponent(CollectionGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
