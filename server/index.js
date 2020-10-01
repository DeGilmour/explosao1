
const express = require('express');
const cors = require('cors')
const app = express();
app.use(cors());
const bodyParser = require('body-parser');
const port = 3000;
const mysql = require('mysql');

app.listen(8081, () => {
    console.log('CORS-enabled web server listening on port 8081')
})
  
var https = require('https');
https.createServer(app).listen(443);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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
    getProduto(connection);
    getNome_tipo(connection)
  })
  

//get 
function getProduto(conn){
  router.get('/produtos-home', (req, res) =>{
    query = 'SELECT p.id_produto, p.nome,quantidade,valor,t.nome as nome_tipo FROM Produtos p inner join Tipos t where p.id_tipo = t.id_tipo order by id_produto asc';
    conn.query(query, function (error, results, fields){
        if(error) return console.log(error);
        //Pego o nome das rows do sql
        return res.send(results);
    });
})
}
function getNome_tipo(conn){
  router.get('/produtos-add-tipo', (req, res) =>{
    query = 'SELECT * from Tipos';
    console.log("here ")
    conn.query(query, function (error, results, fields){
        if(error) return console.log(error);
        return res.send(results);
    });
})
}

//add
function add(conn){
    router.post('/produtos-add', (req, res) =>{
    const nome = req.body.nome;
    const quantidade = req.body.quantidade;
    const id_tipo = req.body.id_tipo;
    const valor  = req.body.valor;
    const query = `insert into Produtos(nome,quantidade,id_tipo,valor) values('${nome}','${quantidade}','${id_tipo}','${valor}')`;
    conn.query(query, function (error, results, fields){
        if(error) return console.log(error);
        console.log('insert was made!');
    });

    console.log(res)
    
    //     return res.redirect('/Despesas');
    });
}
