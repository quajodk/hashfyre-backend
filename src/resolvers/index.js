const authResolver = require('./auth');
const brandResolver = require('./brands');
const campaignResolver = require('./campaign');
const influencerResolver = require('./influencer');
const metricResolver = require('./metric');
const newsResolver = require('./news');
const userResolver = require('./users');

module.exports = {
  ...brandResolver,
  ...authResolver,
  ...campaignResolver,
  ...influencerResolver,
  ...metricResolver,
  ...newsResolver,
  ...userResolver,
};
