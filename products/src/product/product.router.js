const express = require('express');
const catchErrors = require('express-catch-errors');

const router = express.Router();
const { create, list, remove, updateTransaction, addWishList, viewWishList, removeWishList, view } = require('./product.controller');

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
  .route('/userAds')
  .post(catchErrors(view));

router
  .route('/updateTransaction')
  .post(catchErrors(updateTransaction));

router
  .route('/addWishList')
  .post(catchErrors(addWishList));

router
  .route('/viewWishList')
  .post(catchErrors(viewWishList));

router
  .route('/removeWishList')
  .post(catchErrors(removeWishList));  

module.exports = router;
