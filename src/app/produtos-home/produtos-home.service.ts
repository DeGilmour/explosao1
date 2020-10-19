import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProdutosHomeService {

  constructor(private http: HttpClient) { }
  rootURL = '/produtos';
  getProduto() {
    return this.http.get(this.rootURL + '-home');
  }
  Navegate(produto: any) {
    console.log("Produto " + produto);
    return this.http.post(this.rootURL+"-home-para-link" , produto);
    
  }
  NavegateSearch(produto: any) {
    console.log("Produto " + produto);
    return this.http.post(this.rootURL+"-home-para" , produto);
    
  }
  NavegateProd(produto: any) {
    console.log("Produto " + produto);
    return this.http.post(this.rootURL+"-home-para-link-produtos" , produto);
    
  }
  // getProdutoNav() {
  //   return this.http.get(this.rootURL + '-home-set');
  // }
}

