var express = require('express');
var router = express.Router();
var connection = require('../database.js');
var async = require('async');
const fs = require('fs');

getProducts = function () {
  const queryProducts = `SELECT * FROM product LIMIT 6;`; // Submit the statement
  var productPool = [];
  return new Promise(function (resolve, reject) {
    connection.query(queryProducts, function (err, rows) {
      if (rows === undefined) {
        reject(new Error("Error"));
      } else {
        rows.forEach(element => {
          var product = {
            id: element.idProduct,
            name: element.product_name,
            type: element.product_type,
            price: element.product_price,
            desc: element.product_description,
            image: []
          }
          productPool.push(product);
        });
        // console.log(productPool);
        resolve(productPool);
      }
    });
  })
}

function getImage(productPool) {
  return new Promise(function (resolve, reject) {
    var image = { title: 'title' };
    // productPool.push( image );
    resolve([productPool, image]);
  })
}

/* GET home page. */
router.get('/', (req, res, next) => {
  getProducts()
    .then(getImage)
    .then(function ([results, img]) {
      console.log(results);
      console.log(img);
      res.render('home/index', { results });
    }).catch(function (err) {
      console.log("Promise rejection error: " + err);
    })
});

module.exports = router;

//get and post