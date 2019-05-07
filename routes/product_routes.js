var express = require('express');
var router = express.Router();
var con = require('../database.js');

/* GET product page. */

router.get('/product/:id', function(req, res, next) {
  con.query("SELECT * FROM PRODUCT", function(err, result){
    if (err) throw err;
    var id = req.params.id;

    //Blocked out for presentation reasons, this is how the pages are supposed to operate
    /*if(id < result.length){
      var name = result[id].product_name;
      var price = '$' + result[id].product_price;
      var description = result[id].product_description;

      res.render('products/product_info', {name: name, price: price, description: description});
    } else {
      var name = 'You';
      var price = 'are not';
      var description = 'supposed to be here';

      res.render('products/product_info', {name: name, price: price, description: description});
    } */
    
    //Using this for presentation reasons, to make index look nice and look like we have something to sell
    if(id == 1){
      res.render('products/test_product1');
    } else if(id == 2){
      res.render('products/test_product2');
    } else if(id == 3){
      res.render('products/test_product3');
    } else if(id == 4){
      res.render('products/test_product4');
    } else if(id == 5){
      res.render('products/test_product5');
    } else if(id == 6){
      res.render('products/test_product6');
    }
  });
});

module.exports = router;


//get and post

