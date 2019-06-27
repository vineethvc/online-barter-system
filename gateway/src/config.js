/* eslint no-process-env: 0 */

require('dotenv').config();

const environments = ['NODE_ENV', 'PORT', 'USERS', 'PRODUCTS', 'REVIEWS', 'BARTER'];

environments.forEach((name) => {
  if (!process.env[name]) {
    throw new Error(`${name}: ${process.env[name]}`);
  }
});

module.exports = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  USERS: process.env.USERS,
  PRODUCTS: process.env.PRODUCTS,
  REVIEWS: process.env.REVIEWS,
  BARTER: process.env.BARTER
};
