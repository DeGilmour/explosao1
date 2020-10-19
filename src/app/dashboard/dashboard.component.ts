import { Component, OnInit } from '@angular/core';
import { ProdutosLoginService} from '../produtos-login/produtos-login.service'
import { Router } from '@angular/router'
import { ProdutosHeaderComponent } from '../produtos-header/produtos-header.component';
import { ProdutosHeaderServiceService } from '../produtos-header/produtos-header-service.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  id_usuario : String
  public dados_usuario;show_dados;
  constructor(private router: Router, private authService: ProdutosLoginService,private headerP : ProdutosHeaderComponent, private dataSharingService : ProdutosHeaderServiceService) { }
  destroy$: Subject<boolean> = new Subject<boolean>();

  ngOnInit(): void {
    
    // this.headerP.id_usuario =  localStorage.getItem('token');
    this.id_usuario = sessionStorage.getItem('token');
    // this.dados_usuario = this.authService.GetUser(this.id_usuario)
    // console.log("DADOS " + this.dados_usuario.length)
    // for (let index = 0; index < this.dados_usuario.length; index++) {
    //   var dados_user = this.dados_usuario[index];
    //   console.log("DADOS " + dados_user)
      
    // }
    this.dados_usuario = {id_usuario : this.id_usuario }
    this.authService.GetUser(this.dados_usuario).pipe(takeUntil(this.destroy$)).subscribe(data => {
      console.log('message::::', data);
      this.show_dados = data
    });
    
    // var returnUrl = '/produtos-header'; 
    // this.router.events 
  }
  logout() {  
    console.log('logout');  
    this.authService.logout(); 
    this.dataSharingService.isUserLoggedIn.next(false);
    this.dataSharingService.nomeUser.next('');
    this.router.navigate(['/']); 
  }  

}
