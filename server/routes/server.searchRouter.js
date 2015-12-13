/**
 * Created by Valentino on 13.12.2015..
 */
var express = require('express');
var router = express.Router();
var searchController = require('../controllers/server.searchController');

router.get('/', searchController.search);

module.exports = router;