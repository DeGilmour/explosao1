import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProdutosCarrinhoService {
  public conteudo_carrinnho: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  constructor() { }
}
