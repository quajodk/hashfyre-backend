const { DataSource } = require("apollo-datasource");

class Metric extends DataSource {
  constructor({ store }) {
    super();
    this.store = store;
  }

  initialize(config) {
    this.context = config.context;
  }

  async createMetric({ inputs }) {
    try {
      const { campaignId } = inputs;
      // check campaign
      const campaignCheck = await this.store.Campaign.findById({
        _id: campaignId,
      });
      if (!campaignCheck) {
        throw new Error("Campaign not found");
      }

      const campaignMetric = await this.store.Metric.create(inputs);
      return this.store.Campaign.populate(campaignMetric, {
        path: "campaign",
        model: "campaign",
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateMetric({ inputs }) {
    try {
      const { _id } = inputs;
      // check check metric
      const isMetric = await this.store.Metric.findById({ _id });
      if (isMetric) {
        throw new Error("metric ws not found");
      }

      const update = await this.store.Metric.findOneAndUpdate({ _id }, inputs, {
        new: true,
      });
      return this.store.Metric.populate(update, {
        path: "campaignId",
        model: "Campaign",
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async getCampaignMetric({ campaignId }) {
    try {
      // check campaign metric
      const metric = await this.store.Metric.findOne({ campaignId });
      if (!metric) {
        throw new Error("Could not find metric for specified campaign");
      }

      return this.store.Metric.populate(metric, {
        path: "campaignId",
        model: "Campaign",
      });
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = Metric;
