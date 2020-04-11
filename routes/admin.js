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
    text = text.split(' ').join('').split('-').join('');
    let isbn = text.match(/(97(8|9))?\d{9}(\d|X)/);
    if (isbn) {
      isbn = isbn[0];
      books = new books();
      books.ISBN = isbn;
      books.Name = req.body.bookname;
      books.save().then((book) => {
        res.send("Kitap: " + book.Name + " ISBN: " + book.ISBN + " ile kaydedildi.");
      }).catch((err) => {
        res.status(400).send("Bu ISBN ile bir kitap kaydedilmiştir.");
      })
    }
    else res.status(400).send("ISBN Numarası Bulunamadı.")
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

module.exports = router;
