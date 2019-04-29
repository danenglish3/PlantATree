var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var multer = require('multer');
var bodyParser = require('body-parser');

// Define routes to be included here
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
var PORT = 3000;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Add middleware 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer({ storage: multer.memoryStorage({}) }).any());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Tell the app to use the defined routes from above
app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(PORT, () => {
  console.log(`The app is running on port ${PORT} at 'http://localhost:${PORT}' (Use CTRL + C to exit)`);
});