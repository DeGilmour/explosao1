
module.exports = { create_user,login_user }
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


