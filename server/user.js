
module.exports = { create_user,login_user,comprarProtudos, historicoProdutosUsuario }

  function create_user(conn,router){
    router.post('/produtos-create-user', (req, res) =>{
      var nome_usuario = req.body.nome
      var email = req.body.email
      var senha = req.body.senha
      var  query = `insert into usuarios(nome_usuario,email,senha) values ('${nome_usuario}','${email}','${senha}')`;
      console.log(query)
      conn.query(query, function (error, results, fields){
          if(error) return console.log(error);
          return res.send(results);
      });
  })
  }
  
  function login_user(conn,router){

    router.post('/produtos-login', (req, res) =>{
      var email = req.body.id_usuario
      console.log("id_user" + email)
      var senha = req.body.senha
      var  query = `select * from usuarios where email = '${email}'`;
      conn.query(query, function (error, results, fields){
          if(error) return console.log(error);
          return res.send(results);
      });
  })
  }

  function comprarProtudos(conn,router){
    var full_results = []
    router.post('/produtos-carrinho-comprar', (req, res) =>{
      var id_usuario = req.body.id_usuario
      console.log(id_usuario)
      var lista_produtos = req.body.lista_produtos
      var data_compra = req.body.data_compra
      console.log(lista_produtos.length)
      for (let index = 0; index < lista_produtos.length; index++) {
        var id_produto = lista_produtos[index]
        var  query = `insert into compra (id_produto,id_usuario,data_compra) values ('${id_produto}','${id_usuario}','${data_compra}')`;
        conn.query(query, function (error, results, fields){
          if(error) return console.log(error);
          full_results.push(results)
      });
      }
     
      return res.send(full_results);
      
  })

  }
  function historicoProdutosUsuario(conn,router){
    router.post('/produtos-carrinho-compra-historico', (req, res) =>{
      console.log(req.body)
      var id_usuario = req.body.id_usuario
      var  query = `select p.nome,p.valor,p.image,data_compra  from compra c inner join produtos p on p.id_produto = c.id_produto  where  id_usuario =  '${id_usuario}' `;
      console.log(query)
      conn.query(query, function (error, results, fields){
          if(error) return console.log(error);
          return res.send(results);
      });
  })

  }


