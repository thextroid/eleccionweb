import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CircunscripcionesComponent } from './circunscripciones.component';

describe('CircunscripcionesComponent', () => {
  let component: CircunscripcionesComponent;
  let fixture: ComponentFixture<CircunscripcionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CircunscripcionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CircunscripcionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
