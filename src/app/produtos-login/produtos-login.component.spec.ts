import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutosLoginComponent } from './produtos-login.component';

describe('ProdutosLoginComponent', () => {
  let component: ProdutosLoginComponent;
  let fixture: ComponentFixture<ProdutosLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProdutosLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdutosLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
