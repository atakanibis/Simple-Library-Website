var express = require('express');
var router = express.Router();
var books = require('../models/Books');
var users = require('../models/Users');
var time = require('../time');

/* GET home page. */
router.post('/userbooks', function(req, res, next) {
  if(req.body.bookid && req.user) {
    let data = {};
    //users.find({_id: req.user._id}).populate('Books.Book').exec((err, populated) => console.log(populated));
    if(req.user.HasAnyOutDatedBooks()) return res.json({success: false, message: 'Lütfen kitap almadan önce tarihi geçmiş kitaplarınızı iade ediniz.'});
    if(req.user.HasMaxBooks()) return res.json({success: false, message: 'Şuan 3 kitabınız bulunmaktadır lütfen kitap almadan önce birini iade ediniz.'});
    users.findOne({'Books.Book': req.body.bookid}, (err, user) => {
        if(!user) {
            req.user.Books.push({
                Book: req.body.bookid,
                TakenTime: time.obj
            })
            req.user.save().then((user)=> {
                data.success = true;
                data.message = "Kitabı başarıyla aldınız.";
                res.json(data);   
            }).catch(err => {
                console.log(err);
            })
        }
        else res.json({success: false, message: 'Bu kitap bir başka kullanıcıda. Lüten başka bir kitap alınız.'});
    })
  }
});

module.exports = router;
