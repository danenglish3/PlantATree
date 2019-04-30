var express = require('express');
var router = express.Router();

/* GET product page. */
router.get('/product/:id', function(req, res, next) {
  res.render('products/product_info');
});

module.exports = router;

//get and post