const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BrandsSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  name: {
    type: String,
    required: [true, 'Please provide name'],
    trim: true,
  },
  email: {
    type: String,
    require: [true, 'Please provide valid email'],
    trim: true,
    unique: true,
  },
  brandName: {
    type: String,
    required: [true, 'Please provide brand name'],
    trim: true,
  },
  brandWebsite: String,
  phone: {type: String, required: true, trim: true},
  campaignBudget: String,
  isPremium: {
    type: Boolean,
    default: false,
  },
  brandType: String,
  campaigns: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Campaign',
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: Date,
});

module.exports = mongoose.model('Brands', BrandsSchema);
