const express = require('express');
const catchErrors = require('express-catch-errors');

const router = express.Router();
const { create, update, view } = require('./barter.service');
  
router
  .route('/createBarter')
  .post(catchErrors(create));

router
  .route('/updateBarter/:email')
  .put(catchErrors(update));

router
  .route('/getBarterStatus')
  .post(catchErrors(view))

module.exports = router;