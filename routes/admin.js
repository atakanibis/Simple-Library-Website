var express = require('express');
var router = express.Router();
var userModal = require('../models/Users')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/addbook', function(req, res, next) {
  res.render('admin/addbook', { title: 'Express' });
});

router.get('/listusers', function(req, res, next) {
  userModal.find({}).then(users => {
    res.render('admin/listusers', { users: users });
  })
});

router.get('/changetime', function(req, res, next) {
  res.render('admin/changetime', { title: 'Express' });
});

module.exports = router;
