import { TestBed } from '@angular/core/testing';

import { ProdutosLoginService } from './produtos-login.service';

describe('ProdutosLoginService', () => {
  let service: ProdutosLoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProdutosLoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
