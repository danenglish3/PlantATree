module.exports = function(app, passport) {

    app.get('/login', function(req, res){
     res.render('profile/login.ejs', {message:req.flash('loginMessage')});
    });
   
    app.post('/login', passport.authenticate('local-login', {
     successRedirect: '/index', //changed from /profile
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
   
    app.get('/signup', function(req, res){
     res.render('profile/signup.ejs', {message: req.flash('signupMessage')});
    });
   
    app.post('/signup', passport.authenticate('local-signup', {
     successRedirect: '/index', //changed from /profile
     failureRedirect: '/signup',
     failureFlash: true
    }));
   
    app.get('/index', isLoggedIn, function(req, res){//changed from /profile
        res.redirect('/' ) 
    });
    //***ADDED HERE */
   
    app.get('/logout', function(req,res){
     req.session.userid = undefined;
     req.logout();
     res.redirect('/');
    })
   };
   
   function isLoggedIn(req, res, next, ){
    if(req.isAuthenticated())
     return next();
   
    res.redirect('/');
   }