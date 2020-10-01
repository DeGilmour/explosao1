import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutosFooterComponent } from './produtos-footer.component';

describe('ProdutosFooterComponent', () => {
  let component: ProdutosFooterComponent;
  let fixture: ComponentFixture<ProdutosFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProdutosFooterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdutosFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
