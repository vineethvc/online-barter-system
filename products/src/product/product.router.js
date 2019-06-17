const express = require('express');
const catchErrors = require('express-catch-errors');

const router = express.Router();
const { create, list, remove, update, view } = require('./product.controller');

router
  .route('/')
  .post(catchErrors(list))
router
  .route('/createAd')
  .post(catchErrors(create));
router
  .route('/delete')
  .post(catchErrors(remove));

router
  .route('/:id')
  .get(catchErrors(view))
  .put(catchErrors(update));
  

module.exports = router;
