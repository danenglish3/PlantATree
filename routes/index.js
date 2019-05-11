var express = require('express');
var router = express.Router();
var connection = require('../database.js');
var async = require('async');
const fs = require('fs');

//This function will pull 6 products from the database
getProducts = function () {
  const queryProducts = `SELECT * FROM product LIMIT 6;`;
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
          productPool.push(product); //Push new product into easily accessable array
        });
        resolve(productPool); //Once finished resolve (return) the prodcut array
      }
    });
  })
}

// This function will pull 6 images relating to the products grabbed
function getImage(productPool) {
  var imagePool = []; //Variable to hold image data
  return new Promise(function (resolve, reject) {
    async.forEachOf(productPool, function (dataElement, i, inner_callback){ //Async to allow each call to not overlap
      var queryImg = `SELECT name from images WHERE images.product_id = ${productPool[i].id}`;
      connection.query(queryImg, function (err, rows) {
        if (rows[0] === undefined){
          inner_callback();          
        } else {
          addImage(rows, inner_callback); //Call addimage function to add it (pass callback so it knows where to go afterwards)
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
    function addImage(img, done){
      var image = {title: img[0].name}
          imagePool.push(image);
          done(); //head back to callback function
    }
  })
}

/* GET home page. */
router.get('/', (req, res, next) => {
  var passedVariable = req.user;
  console.log(passedVariable);
  req.session.valid = null;
  getProducts()
    .then(getImage)
    .then(function ([results, img]) {
      res.render('home/index', { results, img });
    }).catch(function (err) {
      console.log("Promise rejection error: " + err);
    })
});

module.exports = router;

//get and post