var express = require('express');
const API = require('../db');
var router = express.Router();
/* GET users listing. */
router.post('/', (req, res, next) => API.POST.Products(req, res));
router.get('/:id', (req, res, next) => API.GET_ONE.Products(req, res));
router.get('/', (req, res, next) => API.GET_ALL.Products(req, res));
router.patch('/:id', (req, res, next) => API.UPDATE.Products(req, res));
router.delete('/:id', (req, res, next) => API.DELETE.Products(req, res));

module.exports = router;
