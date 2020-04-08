var express = require('express');
var router = express.Router();
var userModel = require('../models/Users');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('register');
});

router.post('/', function(req, res, next) {
  let params = req.body;
  if(params.uname == null || params.psw == null || params.psw_repeat == null) res.status(400).send("Lütfen tüm alanları doldurunuz");
  else if (params.psw !== params.psw_repeat) res.status(400).send("Girdiğiniz şifreler birbiriyle uyuşmuyor.");
  else {
    let user = new userModel();
    user.UserName = params.uname;
    user.Password = params.psw;
    user.save().then((user) => {
      req.session.user = user;
      res.redirect('/');
    }).catch(err => {
      res.status(400).send("Bu kullanıcı adı kullanılmaktadır.");
    });
  }
});

module.exports = router;
