const axios = require('axios');

const config = require('../config');

module.exports.create = async (req, res) => {
  
  const response = await axios.post(`${config.PRODUCTS}/createAd`, req.body);

  res.json(response.data);
};

module.exports.list = async (req, res) => {
  const response = await axios.post(config.PRODUCTS, req.body);

  res.json(response.data);
};

module.exports.remove = async (req, res) => {
  //const { id } = req.body.advert_id;
  //console.log("In gateway service -------------"+id);
  const response = await axios.post(`${config.PRODUCTS}/delete`, req.body);

  res.json(response.data);
};

module.exports.updateTransaction = async (req, res) => {
 
  const response = await axios.post(`${config.PRODUCTS}/updateTransaction`, req.body);

  res.json(response.data);
};

module.exports.addWishList = async (req, res) => {
 
  const response = await axios.post(`${config.PRODUCTS}/addWishList`, req.body);

  res.json(response.data);
};

module.exports.viewWishList = async (req, res) => {
 
  const response = await axios.post(`${config.PRODUCTS}/viewWishList`, req.body);

  res.json(response.data);
};

module.exports.removeWishList = async (req, res) => {
 
  const response = await axios.post(`${config.PRODUCTS}/removeWishList`, req.body);

  res.json(response.data);
};

module.exports.view = async (req, res) => {
  //const { id } = req.params;
  console.log("In gateway service -------------");
  const response = await axios.post(`${config.PRODUCTS}/userAds`,req.body);

  res.json(response.data);
};
