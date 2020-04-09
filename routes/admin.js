var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/addbook', function(req, res, next) {
  res.render('admin/addbook', { title: 'Express' });
});

router.get('/listusers', function(req, res, next) {
  res.render('admin/listusers', { title: 'Express' });
});

router.get('/changetime', function(req, res, next) {
  res.render('admin/changetime', { title: 'Express' });
});

module.exports = router;
