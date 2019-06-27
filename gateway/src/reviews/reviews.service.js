const axios = require('axios');
const config = require('../config');

module.exports.create = async (req, res) => {
  console.log("api gateway create", req.body);
  const response = await axios.post(`${config.REVIEWS}/addReview`, req.body);
  res.json(response.data);
};

module.exports.list = async (req, res) => {
  const response = await axios.get(`${config.REVIEWS}/getAllReviews`, req.body);
  res.json(response.data);
};