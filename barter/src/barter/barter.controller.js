var connection  = require('../repository');

module.exports.create = async (req, res) => {
  console.log("called service")
  var barter_to_id = req.body.advertId1;
  var barter_with_id = req.body.advertId2;
  var barterer_email = req.body.barter_email;
  var barteree_email = req.body.barteree_email;
  var barter_status = (req.body.status === "Pending") ? 0 :1;
  var barter_duration = req.body.duration;


    var barterQuery = 'INSERT INTO barter(barter_adv_id, barter_adv_with_id, barterer, barteree, barter_duration, barter_status) VALUES(?, ?, ?, ?, ?, ?);';
    var values = [barter_to_id, barter_with_id, barterer_email, barteree_email, barter_duration, barter_status];
    connection.query(barterQuery, values, function(err, result) {
      if (err) throw err;
      console.log('createBarter--- ' + result.affectedRows);
      res.json(result);
    });
  
};

module.exports.update = async (req, res) => {
  var barterId = req.body.barter_id;
  var barterStatus = req.body.barter_status;


  var sql = 'UPDATE barter set barter_status = ? WHERE id = ?';

  connection.query(sql, [barterStatus, barterId], function(err,result) {
    if (err) throw err;
    console.log('updateBarter ' + result.affectedRows);
    res.json(result);
  });
};

module.exports.view = async (req, res) => {
  var barter_to_id = req.body.advertId1;
  var barter_with_id = req.body.advertId2;
  var barter_email = req.body.barter_email;
  var barteree_email = req.body.barteree_email;

  var getBarterStatus = 'SELECT * FROM barter WHERE barterer = ? AND barteree = ?  AND barter_adv_id = ? AND barter_adv_with_id = ?';

  connection.query(getBarterStatus, [barter_email, barteree_email, barter_to_id, barter_with_id], function(err, result) {
    if (err) throw err;
    console.log('getBarter---', result);
    res.json(result);
  });
};

module.exports.list = async(req, res) => {
  var barterer_email = req.body.barter_email;

  var listBarterQuery = 'SELECT * FROM barter WHERE barterer = ? OR barteree = ?'
  connection.query(listBarterQuery, [barterer_email, barterer_email], function(err, result) {
    if (err) throw err;
    console.log('getBarterList---', result);
    res.json(result);
  });
}

