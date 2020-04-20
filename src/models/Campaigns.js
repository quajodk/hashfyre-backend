const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CampaignSchema = new Schema({
  campaignId: {
    type: String,
    required: true,
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Brands',
  },
  name: {
    type: String,
    required: [true, 'Please provide campaign name'],
    trim: true,
  },
  description: String,
  dateCreated: {
    type: Date,
    default: Date.now(),
  },
  objective: String,
  modeOfReward: String,
  budget: Number,
  budgetCurrency: String,
  targetAudience: {
    type: Map,
    of: String,
  },
  campaignType: String,
  content: [
    {
      type: Map,
      of: String,
    },
  ],
  bannerImage: String,
  numOfInfluencers: String,
  startDate: Date,
  endDate: Date,
  applyEndDate: Date,
  rules: String,
  publish: {
    type: Boolean,
    default: false,
  },
  influencers: [
    {
      influencer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Influencer',
      },
      postLink: mongoose.Schema.Types.Mixed,
    },
  ],
  active: {
    type: Boolean,
    default: false,
  },
  campaignMetrics: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Metric',
  },
});

module.exports = mongoose.model('Campaign', CampaignSchema);
