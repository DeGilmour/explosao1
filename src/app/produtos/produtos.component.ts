import { Component, OnInit , OnDestroy, ViewChild, ElementRef } from '@angular/core';
import {FormControl,FormGroup,FormBuilder, NgForm,Validator, FormsModule,Validators, ReactiveFormsModule } from '@angular/forms' 
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProdutosService } from './produtos.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { pipeFromArray } from 'rxjs/internal/util/pipe';
import { listLazyRoutes } from '@angular/compiler/src/aot/lazy_routes';

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}

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
    nome_tipo : "",
    especificacao : ""
  }
  selectedOption: string;
  printedOption: string;

  
  constructor(private produtosService: ProdutosService,private http: HttpClient,  private formBuilder: FormBuilder) {}

  title = 'Produtos';
  
  pForm = new FormGroup({
    nome: new FormControl('', Validators.nullValidator && Validators.required),
    quantidade: new FormControl('', Validators.nullValidator && Validators.required),
    valor : new FormControl('', Validators.nullValidator && Validators.required),
    id_tipo: new FormControl('', Validators.nullValidator && Validators.required),
    id_tipo_categoria: new FormControl('', Validators.nullValidator && Validators.required),
    especificacao  :  new FormControl('', Validators.nullValidator && Validators.required),
    image  :  new FormControl('', Validators.nullValidator && Validators.required)
  });
  

  NumProd = 0;
  public id_tipo
  destroy$: Subject<boolean> = new Subject<boolean>();
  selectOption(id) {
    var id_right;
    for (var c = 1; c < id.length ; c++){
      id_right = id[c];
    }
    this.id_tipo = id_right.replace(id_right +': ','');
    this.id_tipo = parseInt(this.id_tipo)
    this.pForm.setValue({
      nome: '',
      id_tipo: this.id_tipo,
      id_tipo_categoria : '',
      quantidade: '',
      valor : '',
      especificacao  : '',
      image : ''
    });
  }
  selectOptionCategoria(id) {
    var id_right;
    var lista =[]
    for (var c = 1; c < id.length ; c++){
      id_right = id[c];
    }
    var id_tipo = id_right.replace(id_right +': ','');
    id_tipo = parseInt(id_tipo)
    console.log(id_tipo);
    this.pForm.setValue({
      nome: '',
      id_tipo: this.id_tipo,
      id_tipo_categoria : id_tipo,
      quantidade: '',
      valor : '',
      especificacao  : '',
      image : ''
    });
  }

  @ViewChild('UploadFileInput', { static: false }) uploadFileInput: ElementRef;
  fileUploadForm: FormGroup;
  fileInputLabel: string;

  onFileSelect(event) {
    const file = event.target.files[0];
    this.fileInputLabel = file.name;
    // this.pForm.setValue({
    //   nome: '',
    //   id_tipo: '',
    //   id_tipo_categoria : '',
    //   quantidade: '',
    //   valor : '',
    //   especificacao  : '',
    //   image :  this.fileInputLabel
    // });
    this.fileUploadForm.get('uploadedImage').setValue(file);
    alert(this.fileInputLabel)
  }

  onFormSubmit() {

    if (!this.fileUploadForm.get('uploadedImage').value) {
      alert('Para ser inserido o produto precisa ser uma imagem');
      return false;
    }

    const formData = new FormData();
    formData.append('uploadedImage', this.fileUploadForm.get('uploadedImage').value);
    alert(this.fileInputLabel)
    this.pForm.get('image').setValue(this.fileInputLabel);

    this.produtosService.uploadImage(formData).pipe(takeUntil(this.destroy$)).subscribe(data => {
      console.log('message::::', data);
    });

    // this.http
    //   .post<any>('http://localhost:3000/uploadfile', formData).subscribe(response => {
    //     console.log(response);
    //     if (response.statusCode === 200) {
    //       // Reset the file input
    //       this.uploadFileInput.nativeElement.value = "";
    //       this.fileInputLabel = undefined;
    //     }
    //   }, er => {
    //     console.log(er);
    //     alert(er.error.error);
    //   });
  }


  createProducts() {
    this.produtosService.addProduto(this.pForm.value).pipe(takeUntil(this.destroy$)).subscribe(data => {
      console.log('message::::', data);
      if(data!=null){
      alert("Produto inserido com sucesso");
      }
      
    });
  }
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  public nome_tipos;
  public nome_categoria;
  getNome_Tipos() {
    this.produtosService.getNome_Tipos().subscribe(
          data => { this.nome_tipos = data, console.log(data)},
          err => console.error(err),
          () => console.log('get produtos')
        );
  }
  getTipo_Produtos(){
    this.produtosService.getTipo_Produtos().subscribe(
      data => { this.nome_categoria = data, console.log(data)},
      err => console.error(err),
      () => console.log('get produtos')
    );
  }

  ngOnInit(): void {
    this.getTipo_Produtos();
    this.getNome_Tipos();
    this.fileUploadForm = this.formBuilder.group({
      uploadedImage: ['']
    });
  }
 
  
}

