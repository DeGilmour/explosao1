
const express = require('express');
const cors = require('cors')
const app = express();
app.use(cors());
const bodyParser = require('body-parser');
const port = 3000;
const mysql = require('mysql');
const  multipart  =  require('connect-multiparty');
const multer = require('multer');
var fileExtension = require('file-extension')

app.listen(8081, () => {
    console.log('CORS-enabled web server listening on port 8081')
})
  
var https = require('https');
const { query } = require('express');
https.createServer(app).listen(443);
const user = require('./user');
const controller = require('./controller');
const { off } = require('process');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

const router = express.Router();
router.get('/', (req, res) => res.json({ message: 'works' }));
app.use('/', router);
app.listen(port);

const connection = mysql.createConnection({
  host     : '127.0.0.1',
  port     : 3306,
  user     : 'root',
  password : '',
  database : 'explosao'
});

connection.connect(function(err){
    if(err) return console.log(err);
    add(connection);
    getNome_tipo(connection)
    navegate(connection)
    getProduto(connection)
    getTiposProdutos(connection)
    getCategorias_tipo(connection)
    navegateLink(connection)
    getCategorias_tipo_link((connection))
    navegateLink_Produtos(connection)
    navegateLink_Produtos_Self(connection)
    uploadImage(connection)
    user.create_user(connection,router);
    user.login_user(connection,router);
    user.comprarProtudos(connection,router)
    user.historicoProdutosUsuario(connection,router)
  })
  

//get 
function getProduto(conn){
  router.get('/produtos-home', (req, res) =>{
  var query_local = 'SELECT p.id_produto, p.nome,quantidade,valor,t.nome as nome_tipo ,t.id_tipo,p.especificacoes,p.image FROM Produtos p inner join Tipos t on p.id_tipo = t.id_tipo order by id_produto asc';
  conn.query(query_local, function (error, results, fields){
      if(error) return console.log(error);
      //Pego o nome das rows do sql
      return res.send(results);
  });
})
}


function getNome_tipo(conn){
  router.get('/produtos-add-tipo', (req, res) =>{
    var query = 'SELECT * from Tipos ';
    conn.query(query, function (error, results, fields){
        if(error) return console.log(error);
        console.log("resultado"+ results)
        return res.send(results);
    });
})
}
function getTiposProdutos(conn){
  router.get('/produtos-add-tipo-produtos', (req, res) =>{
    var query = 'SELECT t.nome as nome_tipo, p.nome as nome_produto from Tipos t inner join Produtos p where p.id_tipo = t.id_tipo ';
    conn.query(query, function (error, results, fields){
        if(error) return console.log(error);
        return res.send(results);
    });
})
}
function navegate(conn){
  router.post('/produtos-home-para', (req, res) =>{
    console.log("Nomes = " + req.body.setting)
    const nome = req.body.nome;
    var  query = `SELECT p.nome,quantidade,image,id_produto,valor,t.nome as nome_tipo , locate ('${nome}',p.nome) from Produtos p inner join Tipos t where p.id_tipo = t.id_tipo and locate ('${nome}',p.nome) > 0 `;
    if(req.body.setting){
      var order = req.body.setting;
      if(order == 1){
        var  query = `SELECT p.nome,quantidade,image,id_produto,valor,t.nome as nome_tipo from Produtos p inner join Tipos t where p.id_tipo = t.id_tipo order by p.valor desc `;
      }
      else{
        var  query = `SELECT p.nome,quantidade,image,id_produto,valor,t.nome as nome_tipo from Produtos p inner join Tipos t where p.id_tipo = t.id_tipo order by p.valor asc `;
      }
    }
    console.log("Achei  " + query)
    conn.query(query, function (error, results, fields){
        if(error) return console.log(error);
        return res.send(results)
    });
    
})
}
function navegateLink(conn){
  router.post('/produtos-home-para-link', (req, res) =>{
    console.log(req.body)
    var id_tipo = req.body.nome;
    var  query = `SELECT (select count(nome) FROM Produtos WHERE id_tipo = '${id_tipo}'),p.id_produto,p.nome,quantidade,valor,image from Produtos p  where p.id_tipo = '${id_tipo}' `;
    console.log("Achei  " + query)
    conn.query(query, function (error, results, fields){
        if(error) return console.log(error);
        return res.send(results)
    });
    
})
}
function navegateLink_Produtos(conn){
  router.post('/produtos-home-para-link-produtos', (req, res) =>{
    console.log(req.body)
    var id_tipo_categoria = req.body.categoria;
    var id_tipo = req.body.id_tipo;
    var  query = `select p.nome,quantidade,valor,image,id_produto,t.nome as nome_tipo from produtos P  inner join tipos t on t.id_tipo = p.id_tipo where p.id_categoria = '${id_tipo_categoria}' and p.id_tipo = '${id_tipo}'  `;
    console.log("Achei  " + query)
    conn.query(query, function (error, results, fields){
        if(error) return console.log(error);
        return res.send(results)
    });
    
})
}
function navegateLink_Produtos_Self(conn){
  router.post('/produtos-home-para-link-produtos-self', (req, res) =>{
    var id_tipo_categoria = req.body.categoria;
    var id_tipo = req.body.id_tipo;
    var id_produto = req.body.id_produto;
    var  query = `select p.id_produto, p.nome,quantidade,valor,t.nome as nome_tipo,p.especificacoes,image from produtos P  inner join tipos t on t.id_tipo = p.id_tipo where p.id_produto = '${id_produto}' `;
    console.log("Achei  " + query)
    conn.query(query, function (error, results, fields){
        if(error) return console.log(error);
        return res.send(results)
    });
    
})
}

function getCategorias_tipo(conn){
  router.get('/produtos-get-tipo-produtos', (req, res) =>{
    var  query = `SELECT *,t.nome from categorias_tipo ct inner join tipos t on t.id_tipo = ct.id_tipo `;
    conn.query(query, function (error, results, fields){
        if(error) return console.log(error);
        return res.send(results);
    });
})
   
}
function getCategorias_tipo_link(conn){
  router.post('/produtos-get-tipo-produtos-link', (req, res) =>{
    var id_tipo = req.body.id_tipo
    console.log("ID TIPO " + id_tipo)
    var  query = `SELECT *, t.nome as nome_tipo from categorias_tipo ct inner join tipos t on ct.id_tipo = t.id_tipo where ct.id_tipo = '${id_tipo}'  `;
    console.log(query)
    conn.query(query, function (error, results, fields){
        if(error) return console.log(error);
        return res.send(results);
    });
})
   
}

//Adicionar Produtos
function add(conn){
    router.post('/produtos-add', (req, res,next) =>{
    var nome = req.body.nome;
    var quantidade = req.body.quantidade;
    var id_tipo = req.body.id_tipo;
    var valor  = req.body.valor;
    var id_tipo_categoria = req.body.id_tipo_categoria
    var especificacoes =  req.body.especificacao
    var image =  req.body.image
    if (!req.body.nome){
      var error = new Error('Por favor coloque algum produto')
      error.httpStatusCode = 400
      return next(error)
    }
    if (id_tipo_categoria){
      var query = `insert into Produtos(nome,quantidade,id_tipo,valor,id_categoria,especificacoes,image) values('${nome}','${quantidade}','${id_tipo}','${valor}', '${id_tipo_categoria}', '${especificacoes}', '${image}')`;
    }
    else{
      var query = `insert into Produtos(nome,quantidade,id_tipo,valor,especificacoes,image) values('${nome}','${quantidade}','${id_tipo}','${valor}', '${especificacoes}', '${image}')`;
    }
    conn.query(query, function (error, results, fields){
        if(error) return console.log(error);
        return console.log('insert was made!');
    });
    });
}
 
//Upload de imagens de produtos
function uploadImage(){
  var storage = multer.diskStorage({

    destination: function (req, file, cb) {
        cb(null, '../src/assets')
    },

    filename: function (req, file, cb) {
      console.log("ARQUIVO " + file.originalname)
      cb(null, file.originalname)
    }
    
})
  var upload = multer({
    storage: storage,
    limits: {
        // Tamanho
        fileSize: 20000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            cb(new Error('Please upload JPG and PNG images only!'))
        }
        cb(undefined, true)
    }
  })
  app.post('/produtos-add-image', upload.single('uploadedImage'), (req, res, next) => {
    const file = req.file
    console.log(file.originalname);
    if (!file) {
        const error = new Error('Por favor coloque um arquivo')
        error.httpStatusCode = 400
        return next(error)
    }
    res.status(200).send({
        statusCode: 200,
        status: 'success',
        uploadedFile: file
    })

}, (error, req, res, next) => {
    res.status(400).send({
        error: error.message
    })
})

  
}
