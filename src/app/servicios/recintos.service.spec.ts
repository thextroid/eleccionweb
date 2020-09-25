import { TestBed } from '@angular/core/testing';

import { RecintosService } from './recintos.service';

describe('RecintosService', () => {
  let service: RecintosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecintosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
