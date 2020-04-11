var express = require('express');
var router = express.Router();
var books = require('../models/Books');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/books', function(req, res, next) {
  books.find({}).then((books) => {
    res.render('books', {books});
  });
});

module.exports = router;
