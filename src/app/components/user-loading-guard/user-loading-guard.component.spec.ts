import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserLoadingGuardComponent } from './user-loading-guard.component';

describe('UserLoadingGuardComponent', () => {
  let component: UserLoadingGuardComponent;
  let fixture: ComponentFixture<UserLoadingGuardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserLoadingGuardComponent]
    });
    fixture = TestBed.createComponent(UserLoadingGuardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
