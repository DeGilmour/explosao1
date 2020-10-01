
const mysql = require('mysql');
const connection = mysql.createConnection({
  host     : '127.0.0.1',
  port     : 3306,
  user     : 'root',
  password : '',
  database : 'explosao'
});

connection.connect(function(err){
  if(err) return console.log(err);
  console.log('Nice!');
  createTable(connection);
  // alterTable(connection);
})


function createTable(conn){
 
      const sql = "CREATE TABLE if not exists Tipos (id_tipo INT AUTO_INCREMENT PRIMARY KEY, nome VARCHAR(255))";   
      conn.query(sql, function (error, results, fields){
          if(error) return console.log(error);
          console.log('the table has been made!');
      });
    
}

// function alterTable(conn){
//   const sql = "alter table Tipos ADD unique (nome);";   
//   conn.query(sql, function (error, results, fields){
//       if(error) return console.log(error);
//       console.log('the table has been altered!');
//   });
// }
