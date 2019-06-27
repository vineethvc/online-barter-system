var connection  = require('../repository');


module.exports.create = async (req, res) => {
  var barter_advertId = req.body.advertId;
  var barter_email = req.body.barter_email;
  var barteree_email = req.body.barteree_email;
  var barter_status = req.body.status;

    var barterQuery = 'INSERT INTO barter(barter_adv_id, barterer, barteree, barter_status) VALUES(?, ?, ?, ?);';
    var values = [barter_advertId, barter_email, barteree_email, barter_status];
    connection.query(barterQuery, values, function(err, result) {
      if (err) throw err;
      console.log('createBarter--- ' + result.affectedRows);
      res.json(result);
    });
  
};

module.exports.update = async (req, res) => {
  var barter_advertId = req.body.advertId;
  var barter_email = req.body.barter_email;
  var barteree_email = req.body.barteree_email;
  var barter_status = req.body.status;

  var sql = 'UPDATE barter set barter_status = ? WHERE barterer = ? AND barteree = ? AND barter_advertId = ?';

  connection.query(sql, [barter_status, barter_email, barteree_email,barter_advertId], function(err,result) {
    if (err) throw err;
    console.log('updateBarter ' + result.affectedRows);
    res.json(result);
  });
};

module.exports.view = async (req, res) => {
  var barter_advertId = req.body.advertId;
  var barter_email = req.body.barter_email;
  var barteree_email = req.body.barteree_email;
  var barter_status = req.body.status;

  var getBarterStatus = 'SELECT * FROM barter WHERE barterer = ? AND barteree = ? AND barter_advertId = ?';

  connection.query(getBarterStatus, [barter_email, barteree_email, barter_advertId], function(err, result) {
    if (err) throw err;
    console.log('getBarter---', result);
    res.json(result);
  });
};

module.exports.get = async
