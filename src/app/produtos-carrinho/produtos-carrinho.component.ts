import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {ProdutosCarrinhoService} from './produtos-carrinho.service'

@Component({
  selector: 'app-produtos-carrinho',
  templateUrl: './produtos-carrinho.component.html',
  styleUrls: ['./produtos-carrinho.component.css']
})
export class ProdutosCarrinhoComponent implements OnInit {
  public carrinho_conteudo;lista_carr;teste;var_carrinho_produto_nome;lista_produtos = [];newteste;lista_final = [];
  deleteCarrinhoForm = new FormGroup({
    id_produto: new FormControl('', Validators.nullValidator && Validators.required)
  });
  constructor(private dataSharingService : ProdutosCarrinhoService) { this.dataSharingService.conteudo_carrinnho.subscribe( value => {
    console.log("Primeiro " + localStorage.getItem("conteudo_carrinho"))
    if(localStorage.getItem("conteudo_carrinho")){
      this.carrinho_conteudo = localStorage.getItem("conteudo_carrinho");
      
      for (let index = 0; index < JSON.parse(this.carrinho_conteudo).length; index++) {
        this.lista_carr = JSON.parse(this.carrinho_conteudo)
        this.lista_produtos.push(this.lista_carr[index])
      } 
      for (let index = 0; index < this.lista_produtos.length; index++) {
        this.newteste  = this.lista_produtos[index];
        if(typeof this.lista_produtos[1] === 'undefined') {
          this.lista_final = this.newteste
        }
        else{
          this.lista_final.push(this.newteste[0])
        }
        
       
      }
      console.log(this.lista_final)
      
    }

    
});}
public conteudo_carrinnho

  ngOnInit(): void {
    // this.carrinho_conteudo = localStorage.getItem("lista_carrinho")
    // for (let index = 0; index < this.carrinho_conteudo.length; index++) {
    //   var element = this.carrinho_conteudo[index];
    //   console.log('Conteudo do carrinho' + element)
      
    // }
  }
  remover_item(id_produto){
    for (let index = 0; index < this.lista_final.length; index++) {
      var element = this.lista_final[index]["id_produto"];
      if(id_produto == element){
        this.lista_final.splice(index, 1);
        var new_lista = []
        new_lista.push(this.lista_final)
        localStorage.setItem('conteudo_carrinho', JSON.stringify(new_lista));
      }
      
    }
    // console.log("Segundo " +  JSON.stringify(new_lista))
    // console.log("new lista" + new_lista)
    // localStorage.setItem("conteudo_carrinho", JSON.stringify(this.lista_final));
    // console.log("Sobrou" + localStorage.getItem("conteudo_carrinho") + " e agora é" + JSON.stringify(new_lista))
  }

}
