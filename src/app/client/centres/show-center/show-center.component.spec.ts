import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowCenterComponent } from './show-center.component';

describe('ShowCenterComponent', () => {
  let component: ShowCenterComponent;
  let fixture: ComponentFixture<ShowCenterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowCenterComponent]
    });
    fixture = TestBed.createComponent(ShowCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
