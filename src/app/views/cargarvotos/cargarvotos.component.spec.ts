import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CargarvotosComponent } from './cargarvotos.component';

describe('CargarvotosComponent', () => {
  let component: CargarvotosComponent;
  let fixture: ComponentFixture<CargarvotosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CargarvotosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CargarvotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
