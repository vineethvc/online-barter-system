const express = require('express');
const catchErrors = require('express-catch-errors');

const router = express.Router();
const { create, list, remove, update, view } = require('./products.service');

router
  .route('/allAds')
  .post(catchErrors(list))
router
  .route('/ad')
  .post(catchErrors(create));
router
  .route('/delete')
  .post(catchErrors(remove));

router
  .route('/:id')
  .get(catchErrors(view))
  .put(catchErrors(update));
  //.delete(catchErrors(remove));

module.exports = router;
