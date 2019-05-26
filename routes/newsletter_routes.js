// Specifies routes for the email_signup.ejs page
var express = require('express');
var router = express.Router();
var con = require('../database.js');
var alertMsg;

router.get('/newsletter', function(req, res, next){
    alertMsg = "";
    res.render('email/email_signup', {alertMsg: alertMsg});
});

router.post('/newsletter', function(req, res, next){
    var checkEmail = `SELECT * FROM email WHERE email_address = "${req.body.email_input}"`;
    var addEmail = `insert into  email(email_address) values ("${req.body.email_input}");`;

    con.query(checkEmail, function(err, result){
        if (err) throw err;

        try{
            console.log(result[0].email_address);
            if(req.body.email_input == result[0].email_address){
                alertMsg = "Email already exists in the mailing list.";

                res.render('email/email_signup', {alertMsg: alertMsg});
            }
        } catch(err) {
            con.query(addEmail, function(err, result){
                alertMsg = req.body.email_input + " will now recieve newsletter updates!";

                res.render('email/email_signup', {alertMsg: alertMsg});
            });
        }      
    });
});

module.exports = router;