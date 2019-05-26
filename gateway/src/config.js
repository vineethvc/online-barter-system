/* eslint no-process-env: 0 */

require('dotenv').config();

const environments = ['NODE_ENV', 'PORT', 'USERS'];

environments.forEach((name) => {
  if (!process.env[name]) {
    throw new Error(`${name}: ${process.env[name]}`);
  }
});

module.exports = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  USERS: process.env.USERS
};
