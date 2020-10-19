import { Component, ElementRef, OnInit } from '@angular/core';
import { ProdutosBodyService } from './produtos-body.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import {FormControl,FormGroup,FormBuilder, NgForm,Validator, FormsModule,Validators, ReactiveFormsModule } from '@angular/forms' 
import { Routes, Router, RouterModule } from '@angular/router'; 
import {ProdutosHomeComponent} from '../produtos-home/produtos-home.component'
import {Injectable, Renderer2, RendererFactory2} from '@angular/core';
import { DomSanitizer, SafeResourceUrl,  SafeHtml ,SafeUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-produtos-body',
  templateUrl: './produtos-body.component.html',
  styleUrls: ['./produtos-body.component.css']
})
export class ProdutosBodyComponent implements OnInit {
  public value
  public tipos
  public categorias
  public this_display
  public select_tipo = null
  public categorias_valor 
  public nome_tipo_div
  public produtos = null
  public prod_val = null
  public hidden =  true
 
  constructor(private produtosBodyService: ProdutosBodyService, private route: ActivatedRoute,private router: Router,
    private produtosHome : ProdutosHomeComponent, private renderer: Renderer2, private el: ElementRef, private sanitizer: DomSanitizer) {
  
   }
   

  

  
 
  destroy$: Subject<boolean> = new Subject<boolean>();
  viewDetails (nomes) {
    this.router.navigate(['/produtos-home', { nome_produto: nomes }]);
    this.produtosHome.getProdutos()
  }

  pForm = new FormGroup({
    id_tipo: new FormControl('', Validators.nullValidator && Validators.required)
  });
  
  ngOnInit(): void {
    this.getTipos();
  }
  getTipos() {
    this.produtosBodyService.getTipo().subscribe(
      data => { this.tipos = data, console.log(data)
        console.log(data)
      },
  
      err => console.error(err),
      () => console.log('get tipos to body')
    );
    
  }
  createCategorias(nome_categoria){
    this.pForm.setValue({
      id_tipo: nome_categoria
    });
    var id_tipo_div 
    this.produtosBodyService.createCategoria(this.pForm.value).pipe(takeUntil(this.destroy$)).subscribe(data => {
      console.log('message::::', data);
      if (data!=undefined){
        this.produtos = data
        for (let index = 0; index < this.produtos.length; index++) {
          id_tipo_div = this.produtos[index]["id_tipo"];
          this.nome_tipo_div = this.produtos[0]["nome_tipo"];
        }
      //   // var p_link = this.renderer.createElement('div');
      //   // <p class="btn btn-outline-dark"   [routerLink]="['/produtos-home', prod.id_tipo, prod.id]" routerLinkActive>{{prod.nome_categoria}}  </p>
        // var div_inserir = document.getElementsByClassName('divs_Tipos');
        // for (let index = 0; index < div_inserir.length; index++) {
        //   var div_inser = div_inserir[index];
        //   if(div_inser.getAttribute("id") == id_tipo_div){
        //     console.log(div_inser.getAttribute("id"))
        //     var button_categoria = document.createElement('button')
        //     button_categoria.textContent = nome_categoria_div
        //     button_categoria.setAttribute("class", "btn btn-outline-dark")
        //     alert(div_inser.children[0].getAttribute("id"))
        //     div_inser.appendChild(button_categoria)
        //   }
        //   var button_categoria = document.createElement('button')
        //   button_categoria.textContent = nome_categoria
        //   div_inser.appendChild(button_categoria)
          
        // }
       
      }
      
    });
    this.nome_tipo_div = null
  }
    

}
