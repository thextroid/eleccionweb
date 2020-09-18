import { TestBed } from '@angular/core/testing';

import { CircunscripcionesService } from './circunscripciones.service';

describe('CircunscripcionesService', () => {
  let service: CircunscripcionesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CircunscripcionesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
