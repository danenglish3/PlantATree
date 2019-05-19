var express = require('express');
var router = express.Router();

router.get('/cart', function(req, res) {
    res.render('checkout/cart');
  });

module.exports = router;