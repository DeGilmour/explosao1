import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ProdutosCarrinhoService {
  public conteudo_carrinnho: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  constructor(private http : HttpClient) { }

  comprar(produtos_usuario : any){
    return this.http.post("/produtos-carrinho-comprar", produtos_usuario);
  }
  historicoProdutosUsuario(id_send_usuario){
    return this.http.post("/produtos-carrinho-compra-historico",id_send_usuario);
  }
}
