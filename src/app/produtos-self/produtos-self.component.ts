import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ProdutosSelfService } from './produtos-self.service';
import { ProdutosCarrinhoService} from "../produtos-carrinho/produtos-carrinho.service"

@Component({
  selector: 'app-produtos-self',
  templateUrl: './produtos-self.component.html',
  styleUrls: ['./produtos-self.component.css']
})
export class ProdutosSelfComponent implements OnInit {
  public nome_produto;nome;produtos;categoria;id_produto_self;image;
  public categoria_produto;teste
  public lista_para_carrinho = new Array()
  
  constructor(private produtosSelfService: ProdutosSelfService, private router: Router,
    private activatedRoute: ActivatedRoute,private dataSharingService : ProdutosCarrinhoService) {}

  destroy$: Subject<boolean> = new Subject<boolean>();
  getProdutos() {
    this.produtosSelfService.getProduto().subscribe(
          data => { 
            this.activatedRoute.paramMap.subscribe(params => { 
              this.nome_produto = params.get('nome_produto'); 
              this.categoria_produto = params.get('categoria_produto'); 
              this.id_produto_self = params.get('produto'); 
          });
            // if(this.nome_produto && !this.categoria_produto){
            //   this.nome = {nome : this.nome_produto }
            //   this.produtosSelfService.Navegate(this.nome).pipe(takeUntil(this.destroy$)).subscribe(data => {
            //   this.produtos = data
            //   });
              
            // }

          this.categoria = {categoria : this.categoria_produto, id_tipo : this.nome_produto , id_produto : this.id_produto_self }
          this.produtosSelfService.NavegateProd(this.categoria).pipe(takeUntil(this.destroy$)).subscribe(data => {
          console.log('message::::', data);
          this.produtos = data
          if(this.produtos){
            for (let index = 0; index < this.produtos.length; index++) {
              this.image = "assets/" + this.produtos[index]["image"];
            }
          }
          });
          
          this.teste = data, console.log(data)},

          err => console.error(err),
          () => console.log('get produtos')
          );
  }
  ngOnInit(): void {
    this.getProdutos()
  }
  add_produto_carrinho(){
    this.dataSharingService.conteudo_carrinnho.next(this.produtos);
    localStorage.setItem('tem_carrinho', "true");
    // localStorage.setItem("lista_carrinho",this.produtos)
    // console.log("Carrinho" + localStorage.getItem("lista_carrinho"))
    // if (localStorage.hasOwnProperty("conteudo_carrinho")) {
    //   this.lista_para_carrinho = JSON.parse(localStorage.getItem("peoples"))
    // }
    // this.lista_para_carrinho.push(this.produtos);
    // localStorage.setItem("conteudo_carrinho", JSON.stringify(this.lista_para_carrinho));

    if (localStorage.hasOwnProperty("conteudo_carrinho")) {
      this.lista_para_carrinho = JSON.parse(localStorage.getItem("conteudo_carrinho"))
    }
    this.lista_para_carrinho.push(this.produtos);
    localStorage.setItem("conteudo_carrinho", JSON.stringify(this.lista_para_carrinho));
    // this.lista_para_carrinho.push(this.produtos)
    // localStorage.setItem('conteudo_carrinho', JSON.stringify(this.lista_para_carrinho));
    this.router.navigate(["/produtos-carrinho"])

  }

}
