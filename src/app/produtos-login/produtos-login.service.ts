import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProdutosLogin } from './produtos-login';

@Injectable({
  providedIn: 'root'
})
export class ProdutosLoginService {

  constructor( private http : HttpClient) { }    
   logout() :void {    
    sessionStorage.setItem('isLoggedIn','false');    
    sessionStorage.removeItem('token');    
   }    
   
   CreateUser(user: any){
    return this.http.post("produtos-create-user", user);
   }
   public GetUser(user: any){
     console.log(user)
    return this.http.post("produtos-login", user);
   }
}
