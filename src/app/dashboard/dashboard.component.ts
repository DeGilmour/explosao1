import { Component, OnInit } from '@angular/core';
import { ProdutosLoginService} from '../produtos-login/produtos-login.service'
import { Router } from '@angular/router'
import { ProdutosHeaderComponent } from '../produtos-header/produtos-header.component';
import { ProdutosHeaderServiceService } from '../produtos-header/produtos-header-service.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ProdutosCarrinhoService} from '../produtos-carrinho/produtos-carrinho.service'
import * as moment from 'moment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  id_usuario : String
  public dados_usuario;show_dados;has_compra = false;id_send_usuario;historico_produto;valor_total = 0;data_compra;
  constructor(private router: Router, private authService: ProdutosLoginService,private headerP : ProdutosHeaderComponent, private dataSharingService : ProdutosHeaderServiceService, private dataSharingCarrinho : ProdutosCarrinhoService) { }
  destroy$: Subject<boolean> = new Subject<boolean>();

  ngOnInit(): void {
    
    this.id_usuario = sessionStorage.getItem('token');
  
    this.dados_usuario = {id_usuario : this.id_usuario }
    this.authService.GetUser(this.dados_usuario).pipe(takeUntil(this.destroy$)).subscribe(data => {
      console.log('message::::', data);
      this.show_dados = data
      for (let index = 0; index < this.show_dados.length; index++) {
        sessionStorage.setItem('id_usuario',this.show_dados[index]["id_usuario"])
      }
    });
    this.id_send_usuario = sessionStorage.getItem('id_usuario')
    var dict_usuario = {id_usuario : this.id_send_usuario}
    this.dataSharingCarrinho.historicoProdutosUsuario(dict_usuario).pipe(takeUntil(this.destroy$)).subscribe(data => {
      console.log('Produtos::::', data);
      this.historico_produto =  data
      var valor_compra = []
      for (let index = 0; index < this.historico_produto.length; index++) {
        this.data_compra = this.historico_produto[index]["data_compra"];
        this.data_compra = moment(this.data_compra).format("MMM Do YY");
        valor_compra.push(Number(this.historico_produto[index]["valor"]));
      }
      for(var i in valor_compra) { this.valor_total += valor_compra[i]; }
    });

  }
  logout() {  
    console.log('logout');  
    this.authService.logout(); 
    this.dataSharingService.isUserLoggedIn.next(false);
    this.dataSharingService.nomeUser.next('');
    this.router.navigate(['/']); 
  }  

}
