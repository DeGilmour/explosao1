import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutosHomeComponent } from './produtos-home.component';

describe('ProdutosHomeComponent', () => {
  let component: ProdutosHomeComponent;
  let fixture: ComponentFixture<ProdutosHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProdutosHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdutosHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
