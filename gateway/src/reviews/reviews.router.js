const express = require('express');
const catchErrors = require('express-catch-errors');

const router = express.Router();
const { create, list } = require('./reviews.service');
  
router
  .route('/getAllReviews')
  .get(catchErrors(list))
router
  .route('/addReview')
  .post(catchErrors(create));

module.exports = router;