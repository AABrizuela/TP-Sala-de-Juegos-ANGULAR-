import { TestBed } from '@angular/core/testing';

import { ResJuegosService } from './res-juegos.service';

describe('ResJuegosService', () => {
  let service: ResJuegosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResJuegosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
