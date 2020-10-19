import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ProdutosService {

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
  rootURL = '/produtos-add';

  addProduto(produto: any) {
    alert("Produto inserido com sucesso!");
    return this.http.post(this.rootURL , produto);
    
  }
  getNome_Tipos(){
    console.log("get nomes")
    return this.http.get(this.rootURL + "-tipo");
  }
  getTipo_Produtos(){
    return this.http.get('produtos-get-tipo-produtos')
  }

  public uploadImage(image: FormData) {
    return this.http.post(this.rootURL + "-image", image);
  }
 
  
  
  
  
}
