var connection  = require('../repository');

module.exports.create = async (req, res) => {
  var advertId = req.body.advertId;
  var email = req.body.email;
  var rating = req.body.rating;

    var reviewQuery = 'INSERT INTO review(review_advert_id, email, rating) VALUES(?, ?, ?);';
    var values = [advertId, email, rating];
    connection.query(reviewQuery, values, function(err, result) {
      if (err) throw err;
      console.log('addReview--- ' + result.affectedRows);
      res.json(result);
    });
  
};

module.exports.list = async (req, res) => {
  var advertId = req.body.advertId;
  var email = req.body.email;
  var getAllReviewQuery;
  var queryParam;

  if(advertId){
    getAllReviewQuery = 'SELECT * FROM review WHERE email = ?';
    queryParam = email;
  }else if(email){
    getAllReviewQuery = 'SELECT * FROM review WHERE review_advert_id = ?';
    queryParam = advertId;
  }else {
    getAllReviewQuery = 'SELECT * FROM review WHERE review_advert_id = ? AND email = ?';
    queryParam = [advertId, queryParam];
  }

  connection.query(getAllReviewQuery,queryParam, function(err, result, fields) {
    if (err) throw err;
    console.log('getAllReviews---', result);
    res.json(result);
  });

};
