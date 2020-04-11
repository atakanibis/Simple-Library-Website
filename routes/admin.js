var express = require('express');
var router = express.Router();
var userModal = require('../models/Users')
var multer  = require('multer')
var path = require('path')
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)) //Appending extension
  }
})
var upload = multer({ storage: storage });
var tesseract = require('tesseract.js');
var books = require('../models/Books');
var time = require('../time');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/addbook', function(req, res, next) {
  res.render('admin/addbook', { title: 'Express' });
});

router.post('/addbook', upload.single('bookImg'), function(req, res, next) {
  tesseract.recognize(
    req.file.path,
    'eng'
  ).then(({ data: { text } }) => {
    console.log(text);
    text = text.split(' ').join('').split('-').join('');
    let isbn = text.match(/(97(8|9))?\d{9}(\d|X)/);
    if (isbn) {
      isbn = isbn[0];
      let newbook = new books();
      newbook.ISBN = isbn;
      newbook.Name = req.body.bookname;
      newbook.save().then((book) => {
        res.send("Kitap: " + book.Name + " ISBN: " + book.ISBN + " ile kaydedildi.");
      }).catch((err) => {
        res.status(400).send("Bu ISBN ile bir kitap kaydedilmiştir.");
      })
    }
    else res.status(400).send("ISBN Numarası Bulunamadı.");
  })
});

router.get('/listusers', function(req, res, next) {
  userModal.find({}).then(users => {
    res.render('admin/listusers', { users: users });
  })
});

router.get('/changetime', function(req, res, next) {
  res.render('admin/changetime', { title: 'Express' });
});

router.post('/changetime', function(req, res, next) {
  if(req.body.daynumber && !isNaN(req.body.daynumber)) {
    time.addDays(req.body.daynumber);
    res.send("Tarih atlama başarılı . Şuanki Tarih: "+ time.obj.toString());
  } else {
    res.status(400).send("Lütfen bir sayı giriniz.");
  }
});

module.exports = router;
