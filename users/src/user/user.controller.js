var mysql = require("mysql");
var connection = mysql.createConnection({
    host            : process.env.DATABASE_HOST,
    port            : process.env.MYSQL_PORT,
    user            : process.env.MYSQL_USER,
    password        : process.env.MYSQL_PASSWORD,
    database        : process.env.MYSQL_DATABASE
});

connection.connect(function(err){
  if(err){
    console.error("error connecting: " + err.stack);
    return process.exit(22); //consistently exit so the Docker container will restart until it connects to the sql db
  }
  console.log("connected as id " + connection.threadId);
});


module.exports.create = async (req, res) => {
  
};

module.exports.list = async (req, res) => {
  var userEmail = req.params.email;
  var userQuery = 'select * from user';

  console.log('userID:' + userEmail);
  console.log('userQuery:' + userQuery);

  connection.query(userQuery, userEmail, function(error, results, fields){
    if(error) throw error;

    console.log("results---", results[0]);
    res.json(results[0]);
  });
};

module.exports.remove = async (req, res) => {
  
};

module.exports.update = async (req, res) => {
  
};

module.exports.view = async (req, res) => {
 
};
