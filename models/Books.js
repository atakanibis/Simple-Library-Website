const mongoose = require('mongoose');

const booksSchema = new mongoose.Schema({
    ISBN: {
        type: Number,
        required: true,
    },
    Name: {
        type: String,
        required: true
    }
}, {
    usePushEach: true
});
booksSchema.index({ ISBN: 1, Name: 1 }, { unique: true});
const books = mongoose.model('Books', booksSchema);
module.exports = books;