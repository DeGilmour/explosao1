import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProdutosBodyService {

  constructor(private http: HttpClient) { }
  rootURL = '/produtos';
  
  getTipo() {
    return this.http.get(this.rootURL + '-add-tipo');
  }
  Navegate(produto: any) {
    console.log(produto);
    return this.http.post(this.rootURL+"-home-para" , produto);
    
  }
  createCategoria(categoria:any){
    console.log("CATEGORIA"+ categoria)
    return this.http.post(this.rootURL+"-get-tipo-produtos-link" , categoria);
  }
}
