import { TestBed } from '@angular/core/testing';

import { ProdutosBodyService } from './produtos-body.service';

describe('ProdutosBodyService', () => {
  let service: ProdutosBodyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProdutosBodyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
