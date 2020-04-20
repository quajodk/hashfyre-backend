const {DataSource} = require('apollo-datasource');
const _io = require('../../utils/_helpers');

class Metric extends DataSource {
  constructor({store}) {
    super();
    this.store = store;
  }

  initialize(config) {
    this.context = config.context;
  }

  async createMetric({inputs}) {
    try {
      const {campaign} = inputs;
      // check campaign
      const campaignCheck = await this.store.Campaign.findById({
        _id: campaign,
      });
      if (!campaignCheck) {
        throw new Error('Campaign not found');
      }

      // convert to map object
      const postLinks = inputs.campaignLinks.map((link) => {
        return {
          ...link,
          postLink: _io.convert(link.postLink),
        };
      });

      inputs.campaignLinks = postLinks;

      const campaignMetrics = inputs.metrics.map((metric) => {
        return {
          ...metric,
          details: _io.convert(metric.details),
        };
      });

      inputs.metrics = campaignMetrics;

      const campaignMetric = await this.store.Metric.create(inputs);

      // conversion
      const links = campaignMetric._doc.campaignLinks.map((link) => {
        const objLink = _io.MapToObj(link.postLink);
        return {
          ...link,
          postLink: _io.revertToArray(objLink),
        };
      });

      const metricArray = campaignMetric._doc.metrics.map((metric) => {
        const objMetric = _io.MapToObj(metric.details);
        return {
          ...metric,
          details: _io.revertToArray(objMetric),
        };
      });

      campaignMetric._doc.metrics = metricArray;
      campaignMetric._doc.campaignLinks = links;

      await this.store.Campaign.updateOne(
        {_id: campaign},
        {$set: {campaignMetrics: campaignMetric._id}}
      );

      const withCampaign = await this.store.Metric.populate(campaignMetric, {
        path: 'campaign',
        model: 'Campaign',
      });

      console.log(withCampaign);

      // revert to array of key value
      const kpiAudience = _io.MapToObj(withCampaign._doc.targetAudience);
      const postContent = _io.MapToObj(withCampaign._doc.content);

      withCampaign._doc.targetAudience = _io.revertToArray(kpiAudience);
      withCampaign._doc.content = _io.revertToArray(postContent);

      return withCampaign;
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateMetric({inputs}) {
    try {
      const {_id} = inputs;
      // check check metric
      const isMetric = await this.store.Metric.findById({_id});
      if (isMetric) {
        throw new Error('metric ws not found');
      }

      // convert to map object
      const postLinks = inputs.campaignLinks.map((link) => {
        return {
          ...link,
          postLink: _io.convert(link.postLink),
        };
      });

      inputs.campaignLinks = postLinks;

      const campaignMetrics = inputs.metrics.map((metric) => {
        return {
          ...metric,
          details: _io.convert(metric.details),
        };
      });

      inputs.metrics = campaignMetrics;

      const update = await this.store.Metric.findOneAndUpdate({_id}, inputs, {
        new: true,
      });
      // conversion
      const links = campaignMetric._doc.campaignLinks.map((link) => {
        const objLink = _io.MapToObj(link.postLink);
        return {
          ...link,
          postLink: _io.revertToArray(objLink),
        };
      });

      const metricArray = update._doc.metrics.map((metric) => {
        const objMetric = _io.MapToObj(metric.details);
        return {
          ...metric,
          details: _io.revertToArray(objMetric),
        };
      });

      update._doc.metrics = metricArray;
      update._doc.campaignLinks = links;

      return await this.store.Metric.populate(update, {
        path: 'campaign',
        model: 'Campaign',
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async getCampaignMetric({campaignId}) {
    try {
      // check campaign metric
      const metric = await this.store.Metric.findOne({campaign: campaignId});
      if (!metric) {
        throw new Error('Could not find metric for specified campaign');
      }

      // conversion
      const links = campaignMetric._doc.campaignLinks.map((link) => {
        const objLink = _io.MapToObj(link.postLink);
        return {
          ...link,
          postLink: _io.revertToArray(objLink),
        };
      });

      const metricArray = metric._doc.metrics.map((value) => {
        const objMetric = _io.MapToObj(value.details);
        return {
          ...value,
          details: _io.revertToArray(objMetric),
        };
      });

      metric._doc.metrics = metricArray;
      metric._doc.campaignLinks = links;

      return await this.store.Metric.populate(metric, {
        path: 'campaign',
        model: 'Campaign',
      });
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = Metric;
