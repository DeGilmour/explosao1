import { TestBed } from '@angular/core/testing';

import { ProdutosHomeService } from './produtos-home.service';

describe('ProdutosHomeService', () => {
  let service: ProdutosHomeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProdutosHomeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
