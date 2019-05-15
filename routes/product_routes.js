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
  con.query("SELECT * FROM PRODUCT", function(err, result){
    if (err) throw err;

    if(id < result.length){
      name = result[id].product_name;
      price = '$' + result[id].product_price;
      description_text = new String(result[id].product_description);
      /*Splits the description extracted from the database into smaller blocks of string. Since there's no way to detect for 
        new lines, descriptions in the database require '\n' for this to be able to detect new paragraphs and to make the 
        product page look nice and neat in general.*/
      description = description_text.split("\n"); 

    } else {
      //error - go back to index page
      res.render('home/index');
    } 

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