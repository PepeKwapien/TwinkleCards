import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionGroupsComponent } from './collection-groups.component';

describe('CollectionGroupsComponent', () => {
  let component: CollectionGroupsComponent;
  let fixture: ComponentFixture<CollectionGroupsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CollectionGroupsComponent]
    });
    fixture = TestBed.createComponent(CollectionGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
