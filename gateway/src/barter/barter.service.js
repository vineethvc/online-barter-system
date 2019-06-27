const axios = require('axios');
const config = require('../config');

module.exports.create = async (req, res) => {
  const response = await axios.post(`${config.BARTER}/createBarter`, req.body);
  res.json(response.data);
};

module.exports.update = async (req, res) => {
  const { email } = req.params;
  const response = await axios.put(`${config.BARTER}/updateBarter/${email}`, req.body);
  res.json(response.data);
};

module.exports.view = async (req, res) => {
  const response = await axios.post(`${config.USERS}/getBarterStatus`, req.body);
  res.json(response.data);
};


