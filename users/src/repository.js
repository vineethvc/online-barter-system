var mysql = require('mysql');

var connection = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
  });
  
  connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return process.exit(22); //consistently exit so the Docker container will restart until it connects to the sql db
    }
    console.log('connected as id ' + connection.threadId);
  });

module.exports = connection;