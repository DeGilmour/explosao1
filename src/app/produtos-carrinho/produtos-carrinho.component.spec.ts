import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutosCarrinhoComponent } from './produtos-carrinho.component';

describe('ProdutosCarrinhoComponent', () => {
  let component: ProdutosCarrinhoComponent;
  let fixture: ComponentFixture<ProdutosCarrinhoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProdutosCarrinhoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdutosCarrinhoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
