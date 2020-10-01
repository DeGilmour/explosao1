import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutosInicialComponent } from './produtos-inicial.component';

describe('ProdutosInicialComponent', () => {
  let component: ProdutosInicialComponent;
  let fixture: ComponentFixture<ProdutosInicialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProdutosInicialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdutosInicialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
