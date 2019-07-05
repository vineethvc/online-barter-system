const express = require('express');
const catchErrors = require('express-catch-errors');

const router = express.Router();
const { create, update, view, list } = require('./barter.service');
  
router
  .route('/createBarter')
  .post(catchErrors(create));

router
  .route('/updateBarter')
  .put(catchErrors(update));

router
  .route('/getBarterStatus')
  .post(catchErrors(view))

router
  .route('/getBarterAds')
  .post(catchErrors(list))

module.exports = router;