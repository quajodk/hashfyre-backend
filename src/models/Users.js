const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    required: [true, 'Please enter valid email'],
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'Please enter valid password'],
    trim: true,
  },
  userType: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('User', UserSchema);
