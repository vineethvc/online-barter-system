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
  var prod_name= req.body.prod_name;
  var prod_desc= req.body.prod_desc;
  var cat_id= req.body.cat_id;
  var user_id = req.body.user_id;
  var action = req.body.action;
  var quantity = req.body.quantity;
  var imageUrl = req.body.image_url;
  var noProd = 1;
  var prodInsertId = 0;
  /*var adCheckQuery = "SELECT * FROM advert WHERE posted_by ='"+ user_id +"' AND (SELECT COUNT(id) FROM product WHERE product_name = '"+prod_name +"' AND product_description = '"+prod_desc+"') > 0"
  console.log('adCheck Query: ' + adCheckQuery);
  let noProdWait = await connection.query(adCheckQuery, function(error, results, fields){
    if(error) throw error;
    if(results.length){
      console.log('Product already inserted');
      noProd = 0;
      res.json('Product already inserted');
    }
  });
  console.log('no prod wait : '+noProdWait);*/
  if(noProd){
    console.log('Inserting into product table');
    var prodQuery = "INSERT INTO product (product_name, product_description, cat_id) VALUES ('" + prod_name + "','" + prod_desc + "','" + cat_id + "')";
    console.log('prod Query :  '+prodQuery)
    connection.query(prodQuery, function(error, results, fields){
      if(error) throw error;

      prodInsertId = results.insertId;
      console.log('Inserted id : '+prodInsertId);
      if(prodInsertId){
        var advertQuery = "INSERT INTO advert (product_id, posted_by, action, quantity, image_url) VALUES ('" + prodInsertId + "','" + user_id + "','" + action + "','" +quantity+ "','" +imageUrl+"')";
        console.log('advertQuery  :  '+advertQuery);
        connection.query(advertQuery, function(error, results, fields){
          if(error) throw error;
          res.json(results.insertId);
        });
      }
    });
  }
   
};

module.exports.list = async (req, res) => {
  function buildConditions(params) {
    var conditions = [];
    var values = [];
    var conditionsStr;

    if (typeof params.name !== 'undefined') {
      conditions.push("product.product_name LIKE ?");
      values.push("%" + params.name + "%");
    }

    if (typeof params.userId !== 'undefined') {
      conditions.push("advert.posted_by != ?");
      values.push( params.userId);
    } 

    if (typeof params.cat_id !== 'undefined') {
      conditions.push("product.cat_id = ?");
      values.push(parseInt(params.cat_id));
    }

    if (typeof params.action !== 'undefined') {
      conditions.push("action.action_id = ?");
      values.push(parseInt(params.action));
    }

    return {
      where: conditions.length ?
               conditions.join(' AND ') : '1',
      values: values
    };
  }

  var valueBody = req.body;
  var conditions = buildConditions(valueBody);
  var prodQuery = 'SELECT product.product_name,product.product_description,product.cat_id,advert.quantity,advert.image_url,advert.time_stamp,action.action_name,IFNULL(wishlist.wishlist_id, 0) as wishlisted FROM advert LEFT OUTER JOIN product ON advert.product_id = product.id LEFT OUTER JOIN action ON advert.action = action.action_id LEFT OUTER JOIN wishlist ON advert.id = wishlist.advert_id WHERE ' + conditions.where;
  console.log("product query ----", prodQuery);

  connection.query(prodQuery, conditions.values, function(error, results, fields){
    if(error) throw error;

    //console.log("results---", results[0]);
    res.json(results);
  });
};

module.exports.remove = async (req, res) => {
  var advert_id= req.body.advert_id;
  var productId = 0;
  var count = 0;
  var advertDeleted = false;
  var productDeleted = false;
  productId = getProductId(advert_id);
  console.log('product id in delete query---------'+productId);
  res.json('Advert deleted');
};

module.exports.updateTransaction = async (req, res) => {
  var respondedBy= req.body.respondedBy;
  var actionId= req.body.actionId;
  var advertId= req.body.advertId;

  var transactionQuery = "INSERT INTO transaction (responded_by,action_id,advert_id) VALUES ('" + respondedBy + "','" + actionId + "','" + advertId +"')";
  console.log('transactionQuery  :  '+transactionQuery);
  connection.query(transactionQuery, function(error, results, fields){
    if(error) throw error;
    res.json("Contacted seller");
  });
};

module.exports.addWishList = async (req, res) => {
  var userId= req.body.userId;
  var advertId= req.body.advertId;

  var wishListAddQuery = "INSERT INTO wishlist (user_id, advert_id) VALUES ('" + userId + "','" + advertId +"')";
  console.log('wishListAddQuery  :  '+wishListAddQuery);
  connection.query(wishListAddQuery, function(error, results, fields){
    if(error) throw error;
    res.json("Item Wishlisted");
  });
};


module.exports.viewWishList = async (req, res) => {
  function buildConditions(params) {
    var conditions = [];
    var values = [];
    var conditionsStr;

    if (typeof params.name !== 'undefined') {
      conditions.push("user_id = ?");
      values.push(params.name);
    }

    return {
      where: conditions.length ?
               conditions.join(' AND ') : 'user_id = x',
      values: values
    };
  }
  //var userId= req.body.userId;

  var valueBody = req.body;
  var wishlistQuery = 'SELECT * from wishlist WHERE '  + conditions.where;
  console.log('wishlistQuery  :  '+wishlistQuery);
  connection.query(wishlistQuery, conditions.values, function(error, results, fields){
    if(error) throw error;
    res.json(results);
  });
};

module.exports.view = async (req, res) => {
  function buildConditions(params) {
    var conditions = [];
    var values = [];
    var conditionsStr;

    if (typeof params.name !== 'undefined') {
      conditions.push("advert.posted_by = ?");
      values.push(params.name);
    }

    return {
      where: conditions.length ?
               conditions.join(' AND ') : 'advert.posted_by = x',
      values: values
    };
  }

  var valueBody = req.body;
  console.log("Got into method");
  var conditions = buildConditions(valueBody);
  console.log("Values are ======"+conditions);
  var userAdQuery = 'SELECT product.product_name,product.product_description,product.cat_id,advert.quantity,action.action_name FROM advert LEFT OUTER JOIN product ON advert.product_id = product.id LEFT OUTER JOIN action ON advert.action = action.action_id WHERE ' + conditions.where;
  console.log("user Ad Query ----", userAdQuery);

  connection.query(userAdQuery, conditions.values, function(error, results, fields){
    if(error) throw error;

    console.log("results---", results[0]);
    res.json(results);
  });
 
};

function getProductId(advert_id) {
  var productId = 0;
  var getproductIDQuery = "SELECT product_id FROM advert WHERE id = " +advert_id+";";
  console.log('getproductIDQuery  :  '+getproductIDQuery);
  connection.query(getproductIDQuery, function(error, results, fields){
    if(error) throw error;
    if(results.length >0){
      productId = results[0].product_id;
    }
    //productId = results[0].product_id;
    console.log('product id in func---------'+productId);
    deleteAdvert(advert_id,productId);
  }); 
}


function deleteAdvert(advert_id,productId) {
  var advertDeleteQuery = "DELETE FROM advert WHERE id ="+advert_id+";";
    console.log('advertDeleteQuery  :  '+advertDeleteQuery);
    connection.query(advertDeleteQuery, function(error, results, fields){
      if(error) throw error;
      //res.json(results.insertId);
      deleteProduct(productId)
    });
    return true;
}


function deleteProduct(productId) {
  var productDeleteQuery = "DELETE FROM product WHERE id ="+productId+";";
    console.log('productDeleteQuery  :  '+productDeleteQuery);
    connection.query(productDeleteQuery, function(error, results, fields){
      if(error) throw error;
      
    });
    return true;
}