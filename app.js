var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');

require('dotenv').config();
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true })
  .then(() => console.error('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));;

const app = express();

app.use(cors({
  origin: '*'
}));
app.listen(process.env.PORT || '3000', () => {
  console.log(`API listening on PORT ${process.env.PORT} `)
})
app.use(logger('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use("/api/products", require("./api/products"));
app.use("/api/customers", require("./api/customers"));
app.use("/api/categories", require("./api/categories"));
app.use("/api/settings", require("./api/settings"));
app.use("/api/users", require("./api/users"));
app.use("/api", require("./api/transactions"));


app.use(function (req, res, next) {
  next(createError(404));
});



module.exports = app;
