var express = require('express');
var router = express.Router();

/* GET product page. */
router.get('/product/:id', function(req, res, next) {
  if(req.params.id == 1){
    res.render('products/test_tree');
  } else if(req.params.id == 2){
    res.render('products/test_supply');
  } else {
    res.render('products/product_info');
  }
});

module.exports = router;

//get and post