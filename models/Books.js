const mongoose = require('mongoose');

const booksSchema = new mongoose.Schema({
    ISBN: {
        type: Number,
        required: true
    },
    Name: {
        type: String,
        required: true
    }
}, {
    usePushEach: true
});

const books = mongoose.model('Books', booksSchema);
module.exports = books;
