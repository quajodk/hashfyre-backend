const authResolver = require('./auth');
const brandResolver = require('./brands');
const campaignResolver = require('./campaign');
const influencerResolver = require('./influencer');
const metricResolver = require('./metric');
const newsResolver = require('./news');
const userResolver = require('./users');

const resolvers = {
  Mutation: {
    ...authResolver.login,
    ...authResolver.createUser,
    ...authResolver.signOut,
    ...brandResolver.createBrand,
    ...brandResolver.deleteBrand,
    ...brandResolver.updateBrand,
    ...campaignResolver.createCampaign,
    ...campaignResolver.updateCampaign,
    ...influencerResolver.createInfluencer,
    ...influencerResolver.updateInfluencer,
    ...metricResolver.createMetric,
    ...metricResolver.updateMetric,
    ...newsResolver.createNewsMonitor,
    ...newsResolver.deleteNewsMonitor,
    ...newsResolver.updateNewsMonitor,
    ...userResolver.deleteUser,
    ...userResolver.updateUser,
  },
  Query: {
    ...brandResolver.getBrand,
    ...brandResolver.getBrands,
    ...campaignResolver.getCampaign,
    ...campaignResolver.getCampaigns,
    ...influencerResolver.getInfluencer,
    ...influencerResolver.getInfluencers,
    ...newsResolver.getNewsMonitor,
    ...newsResolver.getNewsMonitors,
    ...userResolver.user,
    ...userResolver.users,
    ...metricResolver.campaignMetric,
  },
};

console.log(resolvers);
module.exports = {
  ...resolvers,
};
