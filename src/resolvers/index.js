module.exports = {
  Query: {
    getNewsMonitors: async (_, args, {dataSources}) => {
      return await dataSources.newsAPI.getNewsMonitors();
    },

    getNewsMonitor: async (_, {id}, {dataSources}) => {
      return await dataSources.newsAPI.getNewsMonitor({id});
    },

    getCampaignMetric: async (_, {campaignId}, {dataSources}) => {
      return await dataSources.metricAPI.getCampaignMetric({campaignId});
    },

    getInfluencer: async (_, {id}, {dataSources}) => {
      return await dataSources.influencerAPI.getInfluencer({id});
    },
    getInfluencers: async (_, args, {dataSources}) => {
      return await dataSources.influencerAPI.getInfluencers();
    },

    getCampaign: async (_, {id}, {dataSources}) => {
      return await dataSources.campaignAPI.getCampaign({id});
    },
    getCampaigns: async (_, args, {dataSources}) => {
      return await dataSources.campaignAPI.getCampaigns();
    },

    getUser: async (_, {id}, {dataSources}) => {
      return await dataSources.userAPI.getUser({id});
    },
    getUsers: async (_, args, {dataSources}) => {
      return await dataSources.userAPI.getUsers();
    },

    getBrand: async (_, {id}, {dataSources}) => {
      return await dataSources.brandAPI.getBrand({id});
    },
    getBrands: async (_, args, {dataSources}) => {
      return await dataSources.brandAPI.getBrands();
    },
  },
  Mutation: {
    deleteNewsMonitor: async (_, {id}, {dataSources}) => {
      return await dataSources.newsAPI.deleteNewsMonitor({id});
    },
    updateNewsMonitor: async (_, {inputs}, {dataSources}) => {
      return await dataSources.newsAPI.updateNewsMonitor({inputs});
    },

    createNewsMonitor: async (_, {inputs}, {dataSources}) => {
      return await dataSources.newsAPI.createNewsMonitor({inputs});
    },

    updateMetric: async (_, {inputs}, {dataSources}) => {
      return await dataSources.metricAPI.updateMetric({inputs});
    },

    createMetric: async (_, {inputs}, {dataSources}) => {
      return await dataSources.metricAPI.createMetric({inputs});
    },

    updateInfluencer: async (_, {inputs}, {dataSources}) => {
      return await dataSources.influencerAPI.updateInfluencer({inputs});
    },
    createInfluencer: async (_, {inputs}, {dataSources}) => {
      return await dataSources.influencerAPI.createInfluencer({inputs});
    },

    signOut: async (_, {id}, {dataSources}) => {
      return await dataSources.authAPI.signOut({id});
    },
    createUser: async (_, {inputs}, {dataSources}) => {
      return await dataSources.authAPI.createUser({inputs});
    },
    login: async (_, {inputs}, {dataSources}) => {
      return await dataSources.authAPI.login({inputs});
    },

    updateCampaign: async (_, {inputs}, {dataSources}) => {
      return await dataSources.campaignAPI.updateCampaign({inputs});
    },
    createCampaign: async (_, {inputs}, {dataSources}) => {
      return await dataSources.campaignAPI.createCampaign({inputs});
    },

    deleteUser: async (_, {id}, {dataSources}) => {
      return await dataSources.userAPI.deleteUser({id});
    },
    updateUser: async (_, {inputs}, {dataSources}) => {
      return await dataSources.userAPI.updateUser({inputs});
    },

    deleteBrand: async (_, {id}, {dataSources}) => {
      return await dataSources.brandAPI.deleteBrand({id});
    },
    updateBrand: async (_, {inputs}, {dataSources}) => {
      return await dataSources.brandAPI.updateBrand({inputs});
    },
    createBrand: async (_, {inputs}, {dataSources}) => {
      return await dataSources.brandAPI.createBrand({inputs});
    },
  },
};
