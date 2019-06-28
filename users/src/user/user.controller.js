var connection  = require('../repository');
const jwt = require('jsonwebtoken');

module.exports.create = async (req, res) => {
  var userEmail = req.body.email;
  var userPassword = req.body.password;
  var userFirstName = req.body.first_name;
  var userLastName = req.body.last_name;
  var phoneNumber = req.body.phone_number;
  if (userEmail == undefined || userEmail == '') {
    res.send({
      error: 'email cannot be empty'
    });
  } else if (userPassword == undefined || userPassword == '') {
    res.send({
      error: 'password cannot be empty'
    });
  } else {
    var sql =
      'INSERT INTO user(email, password, first_name, last_name, phone_number) VALUES(?, ?, ?, ?, ?);';
    var values = [userEmail, userPassword, userFirstName, userLastName, phoneNumber];
    connection.query(sql, values, function(err, result) {
      if (err) throw err;
      console.log('creatUser--- ' + result.affectedRows);
      res.json(result);
    });
  }
};

module.exports.list = async (req, res) => {
  connection.query('SELECT * FROM user', function(err, result, fields) {
    if (err) throw err;
    console.log('getAllUsers---', result);
    res.json(result);
  });
};

module.exports.remove = async (req, res) => {
  var userEmail = req.params.email;
  var deleteUserQuery = 'DELETE FROM user WHERE email = ?';

  connection.query(deleteUserQuery, userEmail, function(err, result) {
    if (err) throw err;
    console.log('deleteUser ' + result.affectedRows);
    res.json(result);
  });
};

module.exports.update = async (req, res) => {
  var userEmail = req.body.email;
  var userFirstName = req.body.first_name;
  var userLastName = req.body.last_name;
  var userPhoneNumber = req.body.phone_number;

  var sql = 'UPDATE user set first_name = ?, last_name = ?, phone_number = ?  WHERE email = ?';

  connection.query(sql, [userFirstName, userLastName, userPhoneNumber, userEmail], function(
    err,
    result
  ) {
    if (err) throw err;
    console.log('updateUser ' + result.affectedRows);
    res.json(result);
  });
};

module.exports.view = async (req, res) => {
  var userEmail = req.params.email;
  var getUserQuery = 'SELECT * FROM user WHERE email = ?';

  connection.query(getUserQuery, userEmail, function(err, result) {
    if (err) throw err;
    console.log('getUserByEmail---', result);
    res.json(result);
  });
};

module.exports.login = async (req, res) => {
  var email = req.body.email;
  var password = req.body.password;
  
  var loginUserQuery = 'SELECT * FROM user WHERE email = ?';

  connection.query(loginUserQuery, email, function(err, result) {
    console.log('result--', result);
    if (err) {
      res.send({
        code: 400,
        failed: 'error ocurred'
      });
    } else {
      if (result.length > 0) {
        if (result[0].password == password) {
          const token = jwt.sign(email, "addjsonwebtokensecret");
          res.send({
            code: 200,
            success: 'login successful',
            token: token
          });
        } else {
          res.send({
            code: 204,
            success: 'Email and password does not match'
          });
        }
      } else {
        res.send({
          code: 204,
          success: 'Email does not exits'
        });
      }
     
    }
  });
};

module.exports.logout = async (req, res) => {
  req.session.destroy((err) => {
      if (err) {
        return console.log(err);
      }
      res.send({
        code: 200,
        success: 'User logged out successfully'
      });
    });
};
