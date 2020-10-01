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
}

