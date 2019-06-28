const express = require('express');
const catchErrors = require('express-catch-errors');

const router = express.Router();
const { create, list, remove, updateTransaction, view, addWishList, viewWishList, removeWishList } = require('./products.service');

router
  .route('/allAds')
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
  .route('/contact')
  .post(catchErrors(updateTransaction));
  //.delete(catchErrors(remove));

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
