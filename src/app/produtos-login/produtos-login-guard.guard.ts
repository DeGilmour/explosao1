import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProdutosLoginGuardGuard implements CanActivate {
  constructor( private router : Router){}
  public carrinho_values;
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.isLoggedIn()){
      return true;
    }
    if(this.hasCarrinho()){
      return true
    }
    // if(this.carrinhoContent()){
    //   alert("this carrinho is going")
    //   return this.carrinho_values
    // }
    return true;
  }
  
  public isLoggedIn(): boolean {      
    let status = false;      
    if (sessionStorage.getItem('isLoggedIn') == "true") {      
       status = true;      
    }    
    else {      
       status = false;      
       }      
    return status;      
    }    
    public hasCarrinho(): boolean {      
      let status = false;      
      if (sessionStorage.getItem('tem_carrinho') == "true") {      
         status = true;      
      }    
      else {      
         status = false;      
         }      
      return status;      
      }    
    // public carrinhoContent(carrinho=null ) : Array<any>{
    //   let conteudo_array = [];
    //   alert("aaaaaaaaa" + localStorage.getItem('conteudo_carrinho'))
    //   if (localStorage.getItem('conteudo_carrinho')){      
    //     conteudo_array.push(carrinho)
    //     this.carrinho_values = conteudo_array    
    //   }    
    //   else {      
    //     conteudo_array = []
    //     this.carrinho_values = conteudo_array   
    //     }      
    //   alert(conteudo_array)
    //   return conteudo_array;    

    //   let conteudo_array = []
    //   conteudo_array.push(carrinho)
    //   this.carrinho_values = conteudo_array
    //   return this.carrinho_values
    // }
    
 }    
 
  

