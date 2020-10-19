import { TestBed } from '@angular/core/testing';

import { ProdutosSelfService } from './produtos-self.service';

describe('ProdutosSelfService', () => {
  let service: ProdutosSelfService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProdutosSelfService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
