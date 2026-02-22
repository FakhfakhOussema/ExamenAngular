import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetpasswordmodalComponent } from './resetpasswordmodal.component';

describe('ResetpasswordmodalComponent', () => {
  let component: ResetpasswordmodalComponent;
  let fixture: ComponentFixture<ResetpasswordmodalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResetpasswordmodalComponent]
    });
    fixture = TestBed.createComponent(ResetpasswordmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
