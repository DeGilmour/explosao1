import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutosBodyComponent } from './produtos-body.component';

describe('ProdutosBodyComponent', () => {
  let component: ProdutosBodyComponent;
  let fixture: ComponentFixture<ProdutosBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProdutosBodyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdutosBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
