import { Component, OnInit , OnDestroy } from '@angular/core';
import {FormControl,FormGroup,FormBuilder, NgForm,Validator, FormsModule,Validators, ReactiveFormsModule } from '@angular/forms' 
import {HttpClientModule} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProdutosService } from './produtos.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { pipeFromArray } from 'rxjs/internal/util/pipe';


@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
  
})

export class ProdutosComponent implements OnDestroy,OnInit  {
  page = {
    title :  "Paginal Inicial de Cadastro de produtos",
    background : '/explosao/src/app/produtos/media/syn2mp3biab51.png',
    template: ''
        

  }
  // cadastro de produto
  conteudo = {
    formCadastro : FormGroup,
    nome:"",
    quantidade : "",
    id_tipo : "",
    valor : "",
    nome_tipo : ""
  }
  selectedOption: string;
  printedOption: string;

  
  constructor(private produtosService: ProdutosService) {}

  title = 'Produtos';
  
  pForm = new FormGroup({
    nome: new FormControl('', Validators.nullValidator && Validators.required),
    quantidade: new FormControl('', Validators.nullValidator && Validators.required),
    valor : new FormControl('', Validators.nullValidator && Validators.required),
    id_tipo: new FormControl('', Validators.nullValidator && Validators.required)
  });
  

  NumProd = 0;

  destroy$: Subject<boolean> = new Subject<boolean>();
  selectOption(id) {
    var id_right;
   for (var c = 1; c < id.length ; c++){
     id_right = id[c];
   }
   var id_tipo = id_right.replace(id_right +': ','');
   id_tipo = parseInt(id_tipo)
    console.log(id_tipo);
    this.pForm.setValue({
      nome: '',
      id_tipo: id_tipo,
      quantidade: '',
      valor : ''
    });
  }


  createProducts() {
    this.produtosService.addProduto(this.pForm.value).pipe(takeUntil(this.destroy$)).subscribe(data => {
      console.log('message::::', data);
      alert("Produto inserido com sucesso");
      this.NumProd = this.NumProd + 1;
      console.log(this.NumProd);
      this.pForm.reset();
    });
  }
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  public nome_tipos;
  getNome_Tipos() {
    console.log("here")
    this.produtosService.getNome_Tipos().subscribe(
          data => { this.nome_tipos = data, console.log(data)},
          err => console.error(err),
          () => console.log('get produtos')
        );
  }

  ngOnInit(): void {
   
    this.getNome_Tipos();
  }
 

}
