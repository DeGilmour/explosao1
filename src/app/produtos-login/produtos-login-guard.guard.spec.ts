import { TestBed } from '@angular/core/testing';

import { ProdutosLoginGuardGuard } from './produtos-login-guard.guard';

describe('ProdutosLoginGuardGuard', () => {
  let guard: ProdutosLoginGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ProdutosLoginGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
