var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
const cors = require('cors');
const { isPunemarres } = require('./middleware')
var indexRouter = require('./routes/index');
const cookieParser = require('cookie-parser');
var productsRouter = require('./routes/products');
var usersRouter = require('./routes/users');
const API = require('./db');
require('dotenv').config();


const app = express();

// view engine setup
app.use(cors({
  origin: ['*', 'https://njoftime-back.vercel.app/login']
}));
app.use(logger('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/products', isPunemarres, productsRouter);
app.use('/users', usersRouter);
app.post('/login', API.login);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
