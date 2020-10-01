import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProdutosHomeService } from './produtos-home.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';



@Component({
  selector: 'app-produtos-home',
  templateUrl: './produtos-home.component.html',
  styleUrls: ['./produtos-home.component.css']
})


export class ProdutosHomeComponent implements OnInit {
  page = {
    title :  "Paginal Inicial de Cadastro de produtos",
    background : '/explosao/src/app/produtos/media/syn2mp3biab51.png',
    template: ''
        

  }
 
  constructor(private produtosService: ProdutosHomeService) {}

  title = 'Produtos';

  conteudo = {
    nome:"",
    quantidade : "",
    nome_tipo : "",
    valor : ""
  }
  public produtos
 
  getProdutos() {
    this.produtosService.getProduto().subscribe(
          data => { this.produtos = data, console.log(data)},
          err => console.error(err),
          () => console.log('get produtos')
        );
  }

  ngOnInit(): void {
    this.getProdutos();
    this.Search();
  }
  Search() {
    var name, lista_span, parent, txtValue, valor, input, filter
    input = document.getElementById('search_input');
    filter = input.value.toUpperCase();
    name = document.getElementsByClassName("nomes");
    lista_span =[]; 
    for (var c=0;c < name.length; c++){
      valor = name[c].textContent || name.innerText;
      parent = name[c].parentElement;
      if (valor.toUpperCase().indexOf(filter) > -1) {
      parent.style.display = "";
      } else {
      parent.style.display = "none";
      }
    }
  }

}


