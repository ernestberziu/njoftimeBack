var express = require('express');
const API = require('../db');
var router = express.Router();

/* GET users listing. */
router.post('/', (req, res, next) => API.POST.Users(req, res));
router.get('/:id', (req, res, next) => API.GET_ONE.Users(req, res));
router.get('/', (req, res, next) => API.GET_ALL.Users(req, res));
router.patch('/:id', (req, res, next) => API.UPDATE.Users(req, res));
router.delete('/:id', (req, res, next) => API.DELETE.Users(req, res));


module.exports = router;