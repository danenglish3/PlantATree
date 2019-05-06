var express = require('express');
var router = express.Router();
var con = require('../database.js');

/* GET product page. */

router.get('/product/:id', function(req, res, next) {
  con.query("SELECT * FROM PRODUCT", function(err, result){
    if (err) throw err;
    var id = req.params.id;
    if(id < result.length){
      var name = result[id].product_name;
      var price = '$' + result[id].product_price;
      var description = result[id].product_description;

      res.render('products/product_info', {name: name, price: price, description: description});
    } else {
      
      //Test page will change this later
      var name = 'You';
      var price = 'are not';
      var description = 'supposed to be here';

      res.render('products/product_info', {name: name, price: price, description: description});
    } 
  });
});

module.exports = router;


//get and post

