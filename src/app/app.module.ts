import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProdutosComponent } from './produtos/produtos.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ProdutosHomeComponent } from './produtos-home/produtos-home.component';
import { ProdutosHeaderComponent } from './produtos-header/produtos-header.component';
import { ProdutosFooterComponent } from './produtos-footer/produtos-footer.component';
import { ProdutosInicialComponent } from './produtos-inicial/produtos-inicial.component';
import { ProdutosBodyComponent } from './produtos-body/produtos-body.component';
import { ProdutosSelfComponent } from './produtos-self/produtos-self.component';
import { ProdutosLoginComponent } from './produtos-login/produtos-login.component';
import { ProdutosLoginGuardGuard } from './produtos-login/produtos-login-guard.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProdutosCarrinhoComponent } from './produtos-carrinho/produtos-carrinho.component';

export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AppComponent,
    ProdutosComponent,
    ProdutosHomeComponent,
    ProdutosHeaderComponent,
    ProdutosFooterComponent,
    ProdutosInicialComponent,
    ProdutosBodyComponent,
    ProdutosSelfComponent,
    ProdutosLoginComponent,
    DashboardComponent,
    ProdutosCarrinhoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [ProdutosBodyComponent,ProdutosHomeComponent,ProdutosLoginGuardGuard,ProdutosHeaderComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
