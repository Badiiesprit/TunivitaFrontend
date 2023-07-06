import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCentresCxComponent } from './list-centres-cx.component';

describe('ListCentresCxComponent', () => {
  let component: ListCentresCxComponent;
  let fixture: ComponentFixture<ListCentresCxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListCentresCxComponent]
    });
    fixture = TestBed.createComponent(ListCentresCxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
