var express = require('express');
var router = express.Router();
var userModel = require('../models/Users');
var log = require('../helpers/logger')();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login');
});

router.post('/', function(req, res, next) {
  let params = req.body;
  if(params.uname == null || params.psw == null) res.status(400).send("Lütfen tüm alanları doldurunuz");
  else {
    userModel.findOne({UserName: params.uname, Password: params.psw}).then((user) => {
      log.info(user.UserName + " logged in successfully.");
      req.session.user = user;
      res.status(200).send("Giriş başarılı");
    }).catch((err) => res.status(401).send("Yanlış kullanıcı bilgileri."));
  }
});

module.exports = router;