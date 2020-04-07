const mongoose = require('mongoose');
const TradesModal = require('./trades');

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
const users = mongoose.model('users', userSchema);
module.exports = users;
