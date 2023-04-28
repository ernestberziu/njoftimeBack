var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.send('Hey this is my API running 🥳');
});


module.exports = router;
