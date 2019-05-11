var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var multer = require('multer');
var bodyParser = require('body-parser');
const GracefulShutdownManager = require('@moebius/http-graceful-shutdown').GracefulShutdownManager;
var connection = require('./database.js');
//
var morgan = require('morgan');
var session = require('express-session');
var passport = require('passport');
var flash = require('connect-flash');
require('./config/passport')(passport);

const app = express();
const PORT = 3000;

// view engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

// Add middleware 
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer({ storage: multer.memoryStorage({}) }).any());
app.use(cookieParser());
// ** CHANGED THIS
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({
 extended: true
}));
app.use(session({
  secret: 'justasecret',
  resave:true,
  saveUninitialized: true
 }));
 
 app.use(passport.initialize());
 app.use(passport.session());
 app.use(flash());
 
// Tell the app to use the defined routes from above
app.use(require('./routes/index'));
app.use(require('./routes/product_routes'));
app.use(require('./routes/search_routes'));
require('./routes/signupLogin')(app, passport)



const server = app.listen(PORT, () => {
  console.log(`The app is running on port ${PORT} at 'http://localhost:${PORT}' (Use CTRL + C to exit)`);
});

const shutdownManager = new GracefulShutdownManager(server);

process.on('SIGTERM', () => {
  shutdownManager.terminate(() => {
    console.log('Server is gracefully terminated');
  });
});

module.exports = app;