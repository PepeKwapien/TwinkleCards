import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionsSearchComponent } from './collections-search.component';

describe('CollectionsSearchComponent', () => {
  let component: CollectionsSearchComponent;
  let fixture: ComponentFixture<CollectionsSearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CollectionsSearchComponent]
    });
    fixture = TestBed.createComponent(CollectionsSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
