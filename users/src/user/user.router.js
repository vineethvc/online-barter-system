const express = require('express');
const catchErrors = require('express-catch-errors');
const validateToken = require('../auth/utils').validateToken;

const router = express.Router();

const { create, list, remove, update, view, login, logout } = require('./user.controller');

router
  .route('/login')
  .post(catchErrors(login))

router
  .route('/logout')
  .get(catchErrors(logout));

router
  .route('/')
  .get(validateToken, list)
  .post(catchErrors(create));

router
  .route('/')
  .get(list)
  .post(catchErrors(create));

router
  .route('/:email')
  .get(catchErrors(view))
  .put(catchErrors(update))
  .delete(catchErrors(remove));

module.exports = router;
