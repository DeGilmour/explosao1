import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {ProdutosCarrinhoService} from './produtos-carrinho.service'
import {ProdutosHeaderServiceService} from '../produtos-header/produtos-header-service.service'
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-produtos-carrinho',
  templateUrl: './produtos-carrinho.component.html',
  styleUrls: ['./produtos-carrinho.component.css']
})
export class ProdutosCarrinhoComponent implements OnInit {
  public carrinho_conteudo;lista_carr;teste;var_carrinho_produto_nome;lista_produtos = [];lista_produtos_v2;lista_final = [];imagem; n_produtos_carrinho;tela_checkout = false;
  deleteCarrinhoForm = new FormGroup({
    id_produto: new FormControl('', Validators.nullValidator && Validators.required)
  });
  constructor(private dataSharingService : ProdutosCarrinhoService, private dataSharingServiceHeader : ProdutosHeaderServiceService , private router : Router) { this.dataSharingService.conteudo_carrinnho.subscribe( value => {
    console.log("Primeiro " + localStorage.getItem("conteudo_carrinho"))
    if(localStorage.getItem("conteudo_carrinho")){
      this.carrinho_conteudo = localStorage.getItem("conteudo_carrinho");
      
      for (let index = 0; index < JSON.parse(this.carrinho_conteudo).length; index++) {
        this.lista_carr = JSON.parse(this.carrinho_conteudo)
        this.lista_produtos.push(this.lista_carr[index])
      } 
      for (let index = 0; index < this.lista_produtos.length; index++) {
        this.lista_produtos_v2  = this.lista_produtos[index];
        if(typeof this.lista_produtos[1] === 'undefined') {
          this.lista_final = this.lista_produtos_v2
          this.n_produtos_carrinho = this.lista_final.length
        }
        else{
          this.lista_final.push(this.lista_produtos_v2[0])
          this.n_produtos_carrinho = this.lista_final.length
        }
        
      }
      this.dataSharingServiceHeader.n_produtos_carrinho.next(this.n_produtos_carrinho);
      localStorage.setItem('n_conteudo_carrinho',this.n_produtos_carrinho)
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
        if(this.lista_final.length==0){
        localStorage.removeItem("conteudo_carrinho")
        }
      }

      this.dataSharingServiceHeader.n_produtos_carrinho.next(this.lista_final.length);
      localStorage.setItem('n_conteudo_carrinho',this.n_produtos_carrinho.length)

    }
    // console.log("Segundo " +  JSON.stringify(new_lista))
    // console.log("new lista" + new_lista)
    // localStorage.setItem("conteudo_carrinho", JSON.stringify(this.lista_final));
    // console.log("Sobrou" + localStorage.getItem("conteudo_carrinho") + " e agora é" + JSON.stringify(new_lista))
  }
  destroy$: Subject<boolean> = new Subject<boolean>();
  comprarProtudos(){
    this.tela_checkout = true
    var id_produtos = []
    var usuario_logado  = sessionStorage.getItem('id_usuario');
    var data_compra  = new Date().toISOString().slice(0, 19).replace('T', ' ');
    alert(usuario_logado)
    for (let index = 0; index < this.lista_final.length; index++) {
      id_produtos.push(this.lista_final[index]["id_produto"]);
    }
    var dict_inserir = {lista_produtos : id_produtos, id_usuario : usuario_logado, data_compra : data_compra}
    this.dataSharingService.comprar(dict_inserir).pipe(takeUntil(this.destroy$)).subscribe(data => {
      console.log('message::::', data);
    });
    

  }

}
