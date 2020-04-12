var express = require('express');
var router = express.Router();
var users = require('../models/Users');
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
  res.render('index');
});

router.get('/books', function(req, res, next) {
  books.find({}).then((books) => {
    res.render('books', {books});
  });
});

router.get('/returnbook', function(req, res, next) {
  res.render('returnbook', {books});
});

router.post('/returnbook', upload.single('bookImg'), function(req, res, next) {
  tesseract.recognize(
    req.file.path,
    'eng'
  ).then(({ data: { text } }) => {
    console.log(text);
    text = text.split(' ').join('').split('-').join('');
    let isbn = text.match(/(97(8|9))?\d{9}(\d|X)/);
    if (isbn) {
      isbn = isbn[0];
      users.find({_id: req.user._id}).populate('Books.Book').exec((err, populated) => {
        populated = populated[0];
        var book = populated.Books.find(b => b.Book.ISBN.toString() == isbn);
        if(book) {
          req.user.Books.pull(book._id);
          req.user.save().then((newUser) => res.send("Kitap Başarıyla Iade Edildi.")).catch((err) => {
            res.status(400).send("Bu kitap kütüphaneden alınmamıştır veya bu kitaba sahip değilsin.");
          })
        }
        else res.status(400).send("Bu kitap kütüphaneden alınmamıştır veya bu kitaba sahip değilsin.");
      });
    }
    else res.status(400).send("ISBN Numarası Bulunamadı.");
  })
});

module.exports = router;
