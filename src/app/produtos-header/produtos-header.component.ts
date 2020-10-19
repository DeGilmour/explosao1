import { Component, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProdutosLoginService} from '../produtos-login/produtos-login.service'
import { ProdutosHeaderServiceService } from './produtos-header-service.service';


@Component({
  selector: 'app-produtos-header',
  templateUrl: './produtos-header.component.html',
  styleUrls: ['./produtos-header.component.css']
})
export class ProdutosHeaderComponent implements OnInit {

  constructor(private router: Router, private authService: ProdutosLoginService, private dataSharingService : ProdutosHeaderServiceService) { 
    this.dataSharingService.isUserLoggedIn.subscribe( value => {
      this.isUserLoggedIn = value;
  });
  this.dataSharingService.nomeUser.subscribe( value => {
    this.nome_user = value;
});
  }
  public id_usuario = ""; logado=false;isUserLoggedIn: boolean;nome_user : string;
  ngOnInit(): void {
  }
  
  logout() {  
    console.log('logout');  
    this.authService.logout();  
    this.dataSharingService.isUserLoggedIn.next(false);
    this.dataSharingService.nomeUser.next('');
    this.router.navigate(['/']); 

  }  
}
