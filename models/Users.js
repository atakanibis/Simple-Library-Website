const mongoose = require('mongoose');

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
        BookID: mongoose.SchemaTypes.ObjectId,
        TakenTime: Date
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
const users = mongoose.model('Users', userSchema);
module.exports = users;
