import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';  
import { ProdutosLogin } from './produtos-login';  
import { ProdutosLoginService } from './produtos-login.service'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'; 
import {ProdutosHeaderComponent} from '../produtos-header/produtos-header.component'
import { ProdutosHeaderServiceService } from '../produtos-header/produtos-header-service.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-produtos-login',
  templateUrl: './produtos-login.component.html',
  styleUrls: ['./produtos-login.component.css']
})
export class ProdutosLoginComponent implements OnInit {

  public id_usuario;senha;
  constructor( private formBuilder : FormBuilder,  
    private router : Router,  
    private authService :  ProdutosLoginService,
    private headerP : ProdutosHeaderComponent,
    private dataSharingService : ProdutosHeaderServiceService ) { }
    // model: ProdutosLogin = { id_usuario: "admin", senha: "admin" }  
    // loginForm: FormGroup;  
    message: string;  
    returnUrl: string;  
    submitted : boolean
    public user_size;

    loginForm = new FormGroup({
      id_usuario: new FormControl('', Validators.nullValidator && Validators.required),
      senha: new FormControl('', Validators.nullValidator && Validators.required)
    });
    createUser = new FormGroup({
      nome: new FormControl('', Validators.nullValidator && Validators.required),
      email: new FormControl('', Validators.nullValidator && Validators.required),
      senha: new FormControl('', Validators.nullValidator && Validators.required)
    });

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({  
      id_usuario: ['', Validators.required],  
      senha: ['', Validators.required]  
    });  
    this.returnUrl = '/dashboard';  
    this.authService.logout();  
  }
  get f() { return this.loginForm.controls; }  
  login() {  
  
    if (this.loginForm.invalid) { 
        alert(this.loginForm) 
       return;  
    }  
    else {  
      this.authService.GetUser(this.loginForm.value).pipe(takeUntil(this.destroy$)).subscribe(data => {
        console.log('message::::', data);
        if(data!=null){
          this.user_size = data
          for (let index = 0; index < this.user_size.length; index++) {
            this.id_usuario = this.user_size[index]["email"];
            this.senha = this.user_size[index]["senha"];
            var nome = this.user_size[index]["nome_usuario"];
          }
          if (this.f.id_usuario.value == this.id_usuario && this.f.senha.value == this.senha) {  
            console.log("Logado");  
            this.submitted = true
            sessionStorage.setItem('isLoggedIn', "true");  
            sessionStorage.setItem('token', this.f.id_usuario.value);  
            this.dataSharingService.isUserLoggedIn.next(true);
            this.dataSharingService.nomeUser.next(nome);
            // this.headerP.id_usuario = this.f.id_usuario.value
            // this.headerP.id_usuario = nome
            this.router.navigate([this.returnUrl]); 
         }  
          else {  
            this.message = "Coloque os valores corretos";  
            }  
          }
            
          });
       
      }  
    }  


  destroy$: Subject<boolean> = new Subject<boolean>();
  create_user(){
    this.authService.CreateUser(this.createUser.value).pipe(takeUntil(this.destroy$)).subscribe(data => {
      console.log('message::::', data);
      if(data!=null){
      alert("Produto inserido com sucesso");
      }
      
    });
}    
}
