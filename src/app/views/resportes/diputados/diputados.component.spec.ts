import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiputadosComponent } from './diputados.component';

describe('DiputadosComponent', () => {
  let component: DiputadosComponent;
  let fixture: ComponentFixture<DiputadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiputadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiputadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
