var express = require('express');
var router = express.Router();
module.exports = function(router, passport) {
    router.get('/', function(req, res){
     res.render('index.ejs');
    });

    router.get('/login', function(req, res){
     res.render('./profile/login.ejs', {message:req.flash('loginMessage')});
    });

    router.use(function isLoggedIn(req, res, next){
        if(req.isAuthenticated())
         return next();
    
        res.redirect('/');
       }
    )

    router.post('/login', passport.authenticate('local-login', {
     successRedirect: '/profile',
     failureRedirect: '/login',
     failureFlash: true
    }),
     function(req, res){
      if(req.body.remember){
       req.session.cookie.maxAge = 1000 * 60 * 3;
      }else{
       req.session.cookie.expires = false;
      }
      res.redirect('/');
     });

     router.get('/signup', function(req, res){
     res.render('./profile/signup.ejs', {message: req.flash('signupMessage')});
    });

    router.post('/signup', passport.authenticate('local-signup', {
     successRedirect: '/profile',
     failureRedirect: '/signup',
     failureFlash: true
    }));

    router.get('/profile', isLoggedIn, function(req, res){
     res.render('profile.ejs', {
      user:req.user
     });
    });

    router.get('/logout', function(req,res){
     req.logout();
     res.redirect('/');
    })
   };

   function isLoggedIn(req, res, next){
    if(req.isAuthenticated())
     return next();

    res.redirect('/');
   }