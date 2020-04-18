const { createStore } = require("../../utils/db");

const store = createStore();

const NewsAPI = require("./News");
const MetricAPI = require("./Metric");
const InfluencerAPI = require("./Influencer");
const AuthAPI = require("./Auth");
const CampaignAPI = require("./Campaign");
const UserAPI = require("./User");
const BrandAPI = require("./Brand");

const dataSources = () => ({
  newsAPI: new NewsAPI({ store }),
  metricAPI: new MetricAPI({ store }),
  influencerAPI: new InfluencerAPI({ store }),
  authAPI: new AuthAPI({ store }),
  campaignAPI: new CampaignAPI({ store }),
  userAPI: new UserAPI({ store }),
  brandAPI: new BrandAPI({ store }),
});

module.exports = dataSources;
