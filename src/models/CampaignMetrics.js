const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MetricSchema = new Schema({
  campaign: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Campaign',
  },
  platforms: [String],
  campaignLinks: [
    {
      influencer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Influencer',
      },
      postLink: mongoose.Schema.Types.Mixed,
    },
  ],
  metrics: [
    {
      platform: String,
      details: mongoose.Schema.Types.Mixed,
    },
  ],
});

module.exports = mongoose.model('Metrics', MetricSchema);
