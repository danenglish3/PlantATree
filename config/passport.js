//update a current row
var LocalStrategy = require("passport-local").Strategy;

var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs');
var dbconfig = require('./database');
var connection = mysql.createConnection(dbconfig.connection);

connection.query('USE ' + dbconfig.database);

module.exports = function(passport) {
 passport.serializeUser(function(user, done){
  done(null, user.user_ID); //changed from .id
  console.log("in serializeUser");
 });

 passport.deserializeUser(function(id, done){
  connection.query("SELECT * FROM users WHERE user_ID = ? ", [id],
   function(err, rows){
    done(err, rows[0]);
    console.log("in deSerializeUser");
   });
 });

 passport.use(
  'local-signup',
  new LocalStrategy({
   usernameField : 'username',
   passwordField: 'password',
   passReqToCallback: true
  },
  function(req, username, password, done){
   connection.query("SELECT * FROM users WHERE email_address = ? ", 
   [username], function(err, rows){
    if(err)
     return done(err);
    if(rows.length){
     return done(null, false, req.flash('signupMessage', 'That is already taken'));
    }else{
     var newUserMysql = {
      username: username,
      password: bcrypt.hashSync(password, null, null),
      wholesaler: req.body.wholesaler
     };

     console.log("WHOLESALER"+newUserMysql.wholesaler+"\n"+"WHOLESALER"+req.body.wholesaler);
     var insertQuery = "INSERT INTO users (email_address, password, wholesaler) values (?, ?, ?)";
     connection.query(insertQuery, [newUserMysql.username, newUserMysql.password, newUserMysql.wholesaler], function(err, rows) {
          if(err) {
            console.log(err);
            return done(null, err);
          } else {
            newUserMysql.user_ID = rows.insertId;
            return done(null, newUserMysql);
        }
     });
    }
   });
  })
 );

 passport.use(
  'local-login',
  new LocalStrategy({
   usernameField : 'username',
   passwordField: 'password',
   passReqToCallback: true
  },
  function(req, username, password, done){
   connection.query("SELECT * FROM users WHERE email_address = ? ", [username],
   function(err, rows){
    if(err)
     return done(err);
    if(!rows.length){
     return done(null, false, req.flash('loginMessage', 'No User Found'));
    }
    if(!bcrypt.compareSync(password, rows[0].password))
     return done(null, false, req.flash('loginMessage', 'Wrong Password'));

    return done(null, rows[0]);
   });
  })
 );
};