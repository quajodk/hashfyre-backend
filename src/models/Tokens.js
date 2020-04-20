const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TokenSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  userType: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  login: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: Date,
});

module.exports = mongoose.model('Token', TokenSchema);
