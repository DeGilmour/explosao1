import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutosSelfComponent } from './produtos-self.component';

describe('ProdutosSelfComponent', () => {
  let component: ProdutosSelfComponent;
  let fixture: ComponentFixture<ProdutosSelfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProdutosSelfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdutosSelfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
