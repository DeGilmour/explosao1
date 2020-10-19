import { TestBed } from '@angular/core/testing';

import { ProdutosCarrinhoGuard } from './produtos-carrinho.guard';

describe('ProdutosCarrinhoGuard', () => {
  let guard: ProdutosCarrinhoGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ProdutosCarrinhoGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
