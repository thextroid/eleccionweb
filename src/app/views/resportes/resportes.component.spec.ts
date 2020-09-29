import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResportesComponent } from './resportes.component';

describe('ResportesComponent', () => {
  let component: ResportesComponent;
  let fixture: ComponentFixture<ResportesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResportesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResportesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
