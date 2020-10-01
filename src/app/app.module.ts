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

@NgModule({
  declarations: [
    AppComponent,
    ProdutosComponent,
    ProdutosHomeComponent,
    ProdutosHeaderComponent,
    ProdutosFooterComponent,
    ProdutosInicialComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
