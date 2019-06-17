const axios = require('axios');
const config = require('../config');

module.exports.create = async (req, res) => {
  const response = await axios.post(config.USERS, req.body);

  res.json(response.data);
};

module.exports.list = async (req, res) => {
  const response = await axios.get(config.USERS, req);
  res.json(response.data);
};

module.exports.remove = async (req, res) => {
  const { email } = req.params;

  const response = await axios.delete(`${config.USERS}/${email}`, req.body);

  res.json(response.data);
};

module.exports.update = async (req, res) => {
  const { email } = req.params;

  const response = await axios.put(`${config.USERS}/${email}`, req.body);

  res.json(response.data);
};

module.exports.view = async (req, res) => {
  const { email } = req.params;

  const response = await axios.get(`${config.USERS}/${email}`, req.body);

  res.json(response.data);
};

module.exports.login = async (req, res) => {
  const response = await axios.post(`${config.USERS}/login`, req.body);
  res.json(response.data);
}

module.exports.logout = async (req, res) => {
  const response = await axios.get(`${config.USERS}/logout`, req.body);

  res.json(response.data);
}