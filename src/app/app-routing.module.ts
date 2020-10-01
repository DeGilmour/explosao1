import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProdutosComponent } from './produtos/produtos.component';
import { ProdutosHomeComponent} from './produtos-home/produtos-home.component'
import { ProdutosInicialComponent} from './produtos-inicial/produtos-inicial.component'
import { AppComponent } from './app.component';

const routes: Routes = [
  { path: 'produtos-add', component: ProdutosComponent},
  { path: 'produtos-home', component : ProdutosHomeComponent},
  { path: 'produtos-inicial', component : ProdutosInicialComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
  
 }

