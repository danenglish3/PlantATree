var express = require('express');
var router = express.Router();
var connection = require('../database.js');

router.get('/cart', function (req, res) {
  if (!(req.session.userid === undefined)) {
    var passedVariable = req.user;
    var cartUserId = passedVariable.user_ID;
    var temp3 = getUserCart(cartUserId, "");
    console.log(temp3);

    temp3.then(getCartProd)
    .then(function(rows) {
      res.render('checkout/cart', {rows,passedVariable});
    });   
  } else {
    //var passedVariable = req.user;
    var cartUserId = req.sessionID;
    var temp3 = getUserCart(cartUserId, "");
    console.log(temp3);

    temp3.then(getCartProd)
    .then(function(rows) {
      res.render('checkout/cart', {rows,passedVariable});
    });    
  }

});

function getCartProd(values){
  return new Promise(function (resolve, reject) {
    var prodPool = values[0];
    var queryData = [prodPool];
    var query = `SELECT * FROM product where idProduct in (?);`;
    connection.query(query,queryData, function (err, rows) { 
      if(rows===undefined){
        rows = [];
        resolve(rows);
      }
      var queryImage = `SELECT name FROM images where product_id in (?);`;
      connection.query(queryImage,queryData, function(err, rows2) {
        for(var i =0; i < rows.length; i++){
          rows[i].image = rows2[i].name;
        }
        resolve(rows);
      })
    });
  })

}

function getUserCart(userid, prodid) {
  console.log(prodid);
  return new Promise(function (resolve, reject) { //New promise so this finishs completely before moving on
    var prodList = [];
    const queryCart = `SELECT * FROM cart WHERE user_id = "${userid}"`;
    connection.query(queryCart, function (err, rows) {
      if (rows === undefined) {
        reject(new Error("Error"));
      } /* else if (rows.length === 0){
        resolve("false");
      }  */else {
        rows.forEach(element => {
          prodList.push(element.product_id);
        });
        resolve([prodList, userid, prodid]); //Once finished resolve (return) the prodcut array
      }
    });
  })
}

function updateCart(values) {
  //console.log(values);
  var prodList = values[0];
  var userid = values[1];
  var prodid = values[2];
  //console.log("list: " + prodList + "   user: " + userid + "  prod: " + prodid);

  return new Promise(function (resolve, reject) {
    //console.log(prodList.length);

    function inArray(needle, haystack) {
      var length = haystack.length;
      for (var i = 0; i < length; i++) {
        if (haystack[i] == needle)
          return true;
      }
      return false;
    }
    var temp = inArray(prodid, prodList);
    console.log(temp);
    if (temp) {
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

router.post('/cart/add/:id', (req, res) => {
  if (!(req.session.userid === undefined)) {
    var cartUserId = req.user.user_ID;
    var cartProdId = req.params.id;
    getUserCart(cartUserId, cartProdId)
      .then(updateCart)
      .then(function (msg) {
        res.send(msg);
      })
      .catch(function (err) {
        console.log("Promise rejection error: " + err);
      })
  } else {
    var cartUserId = req.sessionID;
    console.log(req.sessionID);

    var cartProdId = req.params.id;
    getUserCart(cartUserId, cartProdId)
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