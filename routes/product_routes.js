var express = require('express');
var router = express.Router();
var con = require('../database.js');
var fs = require('fs');

/* GET product page. */

router.get('/product/:id', function(req, res, next) {
  var id = req.params.id;
  var name, price, description_text, description, image;

  con.query("SELECT * FROM PRODUCT", function(err, result){
    if (err) throw err;

    if(id < result.length){
      name = result[id].product_name;
      price = '$' + result[id].product_price;
      description_text = new String(result[id].product_description);
      description = description_text.split("\n"); 

    } else {
      //error page
      res.render('home/index');
    } 

    con.query("SELECT * FROM images WHERE product_id ="+id, function(err, result){
      if (err) throw err;
      image = result[0].name;
    });

    res.render('products/product_info', {name: name, price: price, description: description, image: image});
  });
});

module.exports = router;


//get and post

