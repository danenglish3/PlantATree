var express = require('express');
var router = express.Router();
var connection = require('../database.js');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('home/index');
});

module.exports = router;

//get and post