// Specifies routes for the search functionality pages.
var express = require('express');
var router = express.Router();
var connection = require('../database.js');
var async = require('async');

getProductsSearch = function (keyword) {
  if (keyword === ("Supplies")){ //Changed to just keep the results pages looking nice and tidy
    keyword = "supply";
  } else if (keyword[keyword.length-1] === 's' || keyword[keyword.length-1] === 'S'){ //EG trees will become tree in the query
    keyword = keyword.slice(0,keyword.length-1);
  }
  //Ordering by relevant product type first
  const queryProducts = `SELECT * FROM product WHERE (product_name LIKE "%${keyword}%")
                          OR (product_description LIKE "%${keyword}%") OR (product_type LIKE "%${keyword}%")
                          ORDER BY FIELD(product_type, "${keyword}") DESC;`;
  var productPool = [];
  return new Promise(function (resolve, reject) { //New promise so this finishs completely before moving on
    connection.query(queryProducts, function (err, rows) {
      if (rows === undefined) {
        reject(new Error("Error"));
      } else {
        rows.forEach(element => {
          var product = { //For each row returned, create a new product object for easier referencing
            id: element.idProduct,
            name: element.product_name,
            type: element.product_type,
            price: element.product_price,
            desc: element.product_description,
          }
          if(product.desc.length > 120){
            product.desc = product.desc.slice(0,150);
            product.desc += "...";
          }
          productPool.push(product); //Push new product into easily accessable array
        });
        resolve(productPool); //Once finished resolve (return) the prodcut array
      }
    });
  })
}

function getImageSearch(productPool) {
  var imagePool = []; //Variable to hold image data
  return new Promise(function (resolve, reject) {
    async.forEachOf(productPool, function (dataElement, i, inner_callback){ //Async to allow each call to not overlap
      var queryImg = `SELECT name from images WHERE images.product_id = ${productPool[i].id}`;
      connection.query(queryImg, function (err, rows) {
        if (rows[0] === undefined){
          inner_callback();          
        } else {
          addImageSearch(rows, inner_callback); //Call addimage function to add it (pass callback so it knows where to go afterwards)
        }
      })
    }, function(err) {
        if (err){
          console.log("hit error");
        } else {
          resolve([productPool, imagePool]); //Once finished resolve / return both arrays which will be used
        }
    });

    //Use this function to add image to array
    function addImageSearch(img, done){
      var image = {title: img[0].name}
          imagePool.push(image);
          done(); //head back to callback function
    }
  })
}

/* GET product page. */
router.get('/search/:keyword', function(req, res, next) {
    var keyword = req.params.keyword;
    var passedVariable = req.user;

  getProductsSearch(keyword)
    .then(getImageSearch)
    .then(function ([results, img]) {
      res.render('search/search', { results, img, keyword, passedVariable });
    }).catch(function (err) {
      console.log("Promise rejection error: " + err);
    })

});

module.exports = router;

//get and post