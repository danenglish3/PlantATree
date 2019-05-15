var express = require('express');
var router = express.Router();
var connection = require('../database.js');

router.get('/cart', function (req, res) {
  res.render('checkout/cart');
});

getUserCart = function (userid,prodid) {
  console.log(userid);
  var prodList = [];
  const queryCart = `SELECT * FROM cart WHERE user_id = "${userid}"`;
  return new Promise(function (resolve, reject) { //New promise so this finishs completely before moving on
    connection.query(queryCart, function (err, rows) {
      if (rows === undefined) {
        reject(new Error("Error"));
      } else {
        rows.forEach(element => {
          prodList.push(element.product_id);
        });
        console.log(prodList);
        resolve([prodList,userid,prodid]); //Once finished resolve (return) the prodcut array
      }
    });
  })
}

function updateCart(values) {
  var prodList = values[0];
  var userid = values[1];
  var prodid = values[2];
  console.log("list: " + prodList + "   user: " + userid + "  prod: "+prodid);

  return new Promise(function (resolve, reject) { 
    console.log(prodList.length);

  function inArray(needle, haystack) {
      var length = haystack.length;
      for(var i = 0; i < length; i++) {
          if(haystack[i] == needle)
              return true;
      }
      return false;
  }
  var temp = inArray(prodid,prodList);
  console.log(temp);
    if (temp){
      console.log("hello");
      var msg = "Product is already in cart";
      console.log(msg);
      resolve(msg);
    } else {
      var insertProd = `INSERT INTO cart (user_id, product_id) VALUES ("${userid}","${prodid}")`;
      connection.query(insertProd, function (err, rows) {
        var msg = "Product Successfully inserted into cart";
        resolve(msg);
      });
    }
  });
}

router.post('/cart/add/:id', (req,res) => {

  if ((req.session.userid === undefined)){
    var cartUserId = "Daniel";
    var cartProdId = req.params.id;
    getUserCart(cartUserId,cartProdId)
    .then(updateCart)
    .then(function (msg) {
      res.send(msg);
    })
    .catch(function (err) {
      console.log("Promise rejection error: " + err);
    })
  }
  // var message = "Successfully added to cart";
  
});
module.exports = router;