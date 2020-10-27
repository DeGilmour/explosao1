import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProdutosHomeService } from './produtos-home.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Routes, Router, RouterModule } from '@angular/router'; 
import {FormControl,FormGroup,FormBuilder, NgForm,Validator, FormsModule,Validators, ReactiveFormsModule } from '@angular/forms' 
import { ThrowStmt } from '@angular/compiler';


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
 
  constructor(private produtosService: ProdutosHomeService, private router: Router,
    private activatedRoute: ActivatedRoute) {}

  title = 'Produtos';
  
  conteudo = {
    nome:"",
    quantidade : "",
    nome_tipo : "",
    valor : ""
  }
  pForm = new FormGroup({
    nome: new FormControl('', Validators.nullValidator && Validators.required),
  });

  order = new FormGroup({
    setting: new FormControl('', Validators.nullValidator && Validators.required),
  });
  
  public produtos
  public href: string = "";
  public parte_remo : string;
  public nome;
  public categoria;
  public  nome_produto 
  public categoria_produto
  public image;alt_img = true;n_pag = [];uniq;

  getProdutos() {
    this.produtosService.getProduto().subscribe(
          data => { 
            this.activatedRoute.paramMap.subscribe(params => { 
              this.nome_produto = params.get('nome_produto'); 
              this.categoria_produto = params.get('categoria_produto'); 
          });
            console.log("parte" + this.parte_remo);
            if(this.nome_produto && !this.categoria_produto){
              this.nome = {nome : this.nome_produto }
              this.produtosService.Navegate(this.nome).pipe(takeUntil(this.destroy$)).subscribe(data => {
              this.produtos = data
              });
              
            }

            if(this.categoria_produto){
              this.categoria = {categoria : this.categoria_produto, id_tipo : this.nome_produto }
              this.produtosService.NavegateProd(this.categoria).pipe(takeUntil(this.destroy$)).subscribe(data => {
              this.produtos = data
              });

            }
        
            this.produtos = data;
            if(this.produtos){
              for (let index = 0; index < this.produtos.length; index++) {
                this.image = "assets/" + this.produtos[index]["image"];
                console.log(this.produtos)
                if(this.produtos[index]["image"]){
                  this.alt_img = null
                }
                console.log("IMAGE" + this.image)
              }
      
            }
            console.log(data)},
          err => console.error(err),
          () => console.log('get produtos')
        );
  }

  ngOnInit(): void {
    this.getProdutos();
  
    this.activatedRoute.params.subscribe(
      params => {
          this.getProdutos();
      }
  );
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
  destroy$: Subject<boolean> = new Subject<boolean>();
  Navegate(){
    this.produtosService.NavegateSearch(this.pForm.value).pipe(takeUntil(this.destroy$)).subscribe(data => {
      console.log('message::::', data);
      if (data!=undefined){
        console.log("This"+ data)
        this.produtos = data
      }
      this.pForm.reset();
    });
  }

  orderProducts(order_type){
    this.order.setValue({setting : order_type})
    this.produtosService.NavegateSearch(this.order.value).pipe(takeUntil(this.destroy$)).subscribe(data => {
      console.log('message::::', data);
      if (data!=undefined){
        console.log("This"+ data)
        this.produtos = data
      }
      this.order.reset();
    });
  }
  

}


