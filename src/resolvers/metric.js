module.exports = {
  createMetric: async (_, {inputs}, {Metric, Campaign}) => {
    try {
      const {campaignId} = inputs;
      // check campaign
      const campaignCheck = await Campaign.findById({_id: campaignId});
      if (!campaignCheck) {
        throw new Error('Campaign not found');
      }

      const campaignMetric = await Metric.create(inputs);
      return Campaign.populate(campaignMetric, {
        path: 'campaign',
        model: 'campaign',
      });
    } catch (error) {
      throw new Error(error);
    }
  },
  updateMetric: async (_, {inputs}, {Metric}) => {
    try {
      const {_id} = inputs;
      // check check metric
      const isMetric = await Metric.findById({_id});
      if (isMetric) {
        throw new Error('metric ws not found');
      }

      const update = await Metric.findOneAndUpdate({_id}, inputs, {
        new: true,
      });
      return Metric.populate(update, {path: 'campaignId', model: 'Campaign'});
    } catch (error) {
      throw new Error(error);
    }
  },

  campaignMetric: async (_, {campaignId}, {Campaign}) => {
    try {
      // check campaign metric
      const metric = await Metric.findOne({campaignId});
      if (!metric) {
        throw new Error('Could not find metric for specified campaign');
      }

      return Metric.populate(metric, {
        path: 'campaignId',
        model: 'Campaign',
      });
    } catch (error) {
      throw new Error(error);
    }
  },
};
