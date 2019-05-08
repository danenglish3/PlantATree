var express = require('express');
var router = express.Router();
var con = require('../database.js');
var fs = require('fs');

/* GET product page. */

router.get('/product/:id', function(req, res, next) {
  var id = req.params.id;
  var name, price, description_text, description, image, alt;

  var image_path = 'C:\\Users\\Gillian\\Desktop\\FOR PRODUCTS\\'; //Should be url where the images are stored/hosted. Used for temporary image path <- change it to fit or just remove entirely

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

    var image_query = `SELECT name from images WHERE images.product_id = ${id}`;
    con.query(image_query, function(err, result){
      if (err) throw err;
      alt = result[0].name;
      //image = result[0].url; //preferably the image url as opposed to its name or its blob data
      image = image_path+alt; //used for now
      res.render('products/product_info', {name: name, price: price, description: description, image: image, alt: alt});
    });
  });
});

module.exports = router;


//get and post

