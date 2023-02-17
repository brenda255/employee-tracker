const mysql = require("mysql2");

const connection = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'employee_db',
    },
    console.log(`Connected to the employee_db database.`)
  );


  connection.connect(function(error){
    if (error) throw error;
  })

  module.exports = connection;