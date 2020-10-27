import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
@Injectable()
export class ProdutosHeaderServiceService {
  public isUserLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public nomeUser: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public n_produtos_carrinho : BehaviorSubject<Number> = new BehaviorSubject<Number>(0);
  constructor() { }
}
