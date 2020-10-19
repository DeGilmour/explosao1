import { TestBed } from '@angular/core/testing';

import { ProdutosHeaderServiceService } from './produtos-header-service.service';

describe('ProdutosHeaderServiceService', () => {
  let service: ProdutosHeaderServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProdutosHeaderServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
