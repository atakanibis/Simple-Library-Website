const mongoose = require('mongoose');
const time = require('../time');

const userSchema = new mongoose.Schema({
  UserName: {
    type: String,
    index: true,
    unique: true,
  },
  Password: {
    type: String,
    required: true,
  },
  Books: [
    {
        Book: {type: mongoose.Schema.Types.ObjectId, ref: 'Books'},
        TakenTime: Date,
    }
  ],
  IsAdmin: {
    type: Number,
    default: false,
  },
  Created_at: {
    type: Date,
    default: Date.now,
  }
}, {
  usePushEach: true
});
userSchema.methods.HasAnyOutDatedBooks = function() {
  let bool = false
  this.Books.forEach(book => {
    const diffTime = Math.abs(time.obj - book.TakenTime);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    if(diffDays > 7) bool = true;
  });
  return bool
}
userSchema.methods.HasMaxBooks = function() {
  if(this.Books.length >= 3) return true;
  return false;
}

const users = mongoose.model('Users', userSchema);
module.exports = users;
