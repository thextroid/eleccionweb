import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdowndataComponent } from './dropdowndata.component';

describe('DropdowndataComponent', () => {
  let component: DropdowndataComponent;
  let fixture: ComponentFixture<DropdowndataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DropdowndataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdowndataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
