var express = require('express');
var router = express.Router();
var con = require('../database.js'); //From the exported connection from database.js
var fs = require('fs');

/* GET product page. */

/*
  Queries the databse for all products and produces a dynamic product page based on a product whose id matches the id parameter passed.
 */
router.get('/product/:id', function(req, res, next) {
  var id = req.params.id;
  var name, price, description_text, description, image, alt;

  var image_path = '/images/'; //Should be url where the images are stored/hosted <- change it to fit or just remove entirely

  /*Takes the important information from a product whose id matches the id paramater passed, if there's no such product 
    then it renders user back to the index page.
  */
  con.query(`SELECT * FROM PRODUCT WHERE idProduct = "${id}"`, function(err, result){
    if (err) throw err;
      
    name = result[0].product_name;
    price = '$' + result[0].product_price;
    //Splits extracted description if '\n' is found.
    description = String(result[0].product_description).split(/\\n/);

    console.log(name, price, description);

    /*Queries database for all the images related to a product whose id matches the id parameter passed,
      takes the topmost image from the result and renders a product page while passing all the information extracted from the database.
    */
    var image_query = `SELECT name from images WHERE images.product_id = ${id}`;
    con.query(image_query, function(err, result){
      if (err) throw err;
      alt = result[0].name;
      //preferably the image url 
      image = image_path+alt; //used for now
      res.render('products/product_info', {name: name, price: price, description: description, image: image, alt: alt});
    });
  });
});

module.exports = router;


//get and post