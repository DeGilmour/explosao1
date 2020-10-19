import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProdutosComponent } from './produtos/produtos.component';
import { ProdutosHomeComponent} from './produtos-home/produtos-home.component'
import { ProdutosInicialComponent} from './produtos-inicial/produtos-inicial.component'
import {ProdutosSelfComponent} from './produtos-self/produtos-self.component'
import {ProdutosLoginComponent} from './produtos-login/produtos-login.component'
import { AppComponent } from './app.component';
import {DashboardComponent} from './dashboard/dashboard.component'
import { ProdutosLoginGuardGuard } from './produtos-login/produtos-login-guard.guard';
import {ProdutosCarrinhoGuard} from './produtos-carrinho/produtos-carrinho.guard'
import {ProdutosHeaderComponent} from './produtos-header/produtos-header.component'
import {ProdutosCarrinhoComponent} from './produtos-carrinho/produtos-carrinho.component'

const routes: Routes = [
  { path: 'produtos-add', component: ProdutosComponent,canActivate : [ProdutosLoginGuardGuard]},
  { path: 'produtos-home', component : ProdutosHomeComponent,canActivate : [ProdutosLoginGuardGuard]},
  { path: 'produtos-home/:nome_produto', component : ProdutosHomeComponent,canActivate : [ProdutosLoginGuardGuard]},
  { path: 'produtos-home/:nome_produto/:categoria_produto/:produto', component : ProdutosHomeComponent,canActivate : [ProdutosLoginGuardGuard]},
  { path: 'produtos-home/:nome_produto/:categoria_produto', component : ProdutosHomeComponent,canActivate : [ProdutosLoginGuardGuard]},
  { path: 'produtos-inicial', component : ProdutosInicialComponent,canActivate : [ProdutosLoginGuardGuard] },
  { path: 'produtos-self/:produto', component : ProdutosSelfComponent,canActivate : [ProdutosLoginGuardGuard] },
  { path: 'produtos-login', component: ProdutosLoginComponent }, 
  { path: 'produtos-header', component: ProdutosHeaderComponent, canActivate : [ProdutosLoginGuardGuard]},
  { path: 'dashboard', component: DashboardComponent, canActivate : [ProdutosLoginGuardGuard]},
  { path: 'produtos-carrinho', component: ProdutosCarrinhoComponent, canActivate : [ProdutosLoginGuardGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
  
 }

