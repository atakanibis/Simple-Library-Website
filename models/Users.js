const mongoose = require('mongoose');
const TradesModal = require('./trades');

const userSchema = new mongoose.Schema({
  SteamID: {
    type: String,
    index: true,
    unique: true,
  },
  Token: {
    type: String,
    default: null,
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
