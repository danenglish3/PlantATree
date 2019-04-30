var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var multer = require('multer');
var bodyParser = require('body-parser');

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

// Tell the app to use the defined routes from above
app.use(require('./routes/index'));
app.use(require('./routes/product_routes'));

app.listen(PORT, () => {
  console.log(`The app is running on port ${PORT} at 'http://localhost:${PORT}' (Use CTRL + C to exit)`);
});

module.exports = app;
