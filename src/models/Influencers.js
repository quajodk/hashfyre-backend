const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InfluencerSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  email: {
    type: String,
    required: true,
  },
  name: String,
  socialMediaHandle: {
    type: Map,
    of: String,
  },
  joinedCampaign: [
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

module.exports = mongoose.model('Influencers', InfluencerSchema);
