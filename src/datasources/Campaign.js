const {DataSource} = require('apollo-datasource');
const _io = require('../../utils/_helpers');

class Campaign extends DataSource {
  constructor({store}) {
    super();
    this.store = store;
  }

  initialize(config) {
    this.context = config.context;
  }

  async createCampaign({inputs}) {
    try {
      const {
        creator,
        campaignId,
        name,
        description,
        dateCreated,
        modeOfReward,
        budgetAmount,
        budgetCurrency,
        objective,
        audience,
        campaignType,
        content,
        imageUrl,
        influencerCount,
        endDate,
        startDate,
        applicationDeadline,
        rules,
      } = inputs;

      // check for creator
      const isBrand = await this.store.Brand.findById({_id: creator});
      if (!isBrand) {
        throw new Error('Can not create campaign');
      }

      const campaignExist = await this.store.Campaign.findOne({campaignId});
      if (campaignExist) {
        throw new Error('Campaign already exist');
      }

      // campaign object
      const campaign = {
        campaignId,
        creator: isBrand._id,
        name,
        description,
        dateCreated,
        objective,
        modeOfReward,
        budget: +budgetAmount,
        budgetCurrency,
        targetAudience: _io.convert(audience),
        campaignType,
        content: [_io.convert(content)],
        bannerImage: imageUrl,
        numOfInfluencers: influencerCount,
        applyEndDate: applicationDeadline,
        endDate,
        startDate,
        rules,
      };

      const createdCampaign = await this.store.Campaign.create(campaign);

      // revert to array of key value
      const kpiAudience = _io.MapToObj(createdCampaign._doc.targetAudience);
      const postContent = _io.MapToObj(createdCampaign._doc.content);

      createdCampaign._doc.targetAudience = _io.revertToArray(kpiAudience);
      createdCampaign._doc.content = _io.revertToArray(postContent);

      return await this.store.Campaign.populate(createdCampaign, {
        path: 'creator',
        model: 'Brand',
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateCampaign({inputs}) {
    try {
      const {_id} = inputs;
      // check campaign
      const campaignCheck = await this.store.Campaign.findById({_id});
      if (!campaignCheck) {
        throw new Error('Campaign not found');
      }

      const {
        name,
        description,
        dateCreated,
        modeOfReward,
        budgetAmount,
        budgetCurrency,
        audience,
        campaignType,
        content,
        imageUrl,
        influencerCount,
        endDate,
        startDate,
        applicationDeadline,
        rules,
        published,
        influencers,
      } = inputs;

      // convert
      const campaignUpdate = {
        name,
        description,
        dateCreated,
        objective,
        modeOfReward,
        budget: budgetAmount,
        budgetCurrency,
        targetAudience: _io.convert(audience),
        campaignType,
        content: [_io.convert(content)],
        bannerImage: imageUrl,
        numOfInfluencers: influencerCount,
        applyEndDate: applicationDeadline,
        endDate,
        startDate,
        rules,
        published,
        influencers: influencers.map((link) => {
          return {
            ...link,
            postLink: _io.convert(link.postLink),
          };
        }),
      };

      const update = await this.store.Campaign.findOneAndUpdate(
        {_id},
        campaignUpdate,
        {
          new: true,
        }
      );

      // revert to array of key value
      const kpiAudience = _io.MapToObj(update._doc.targetAudience);
      const postContent = _io.MapToObj(update._doc.content);
      const influencer = update._doc.influencers.map((link) => {
        const objLink = _io.MapToObj(link.postLink);
        return {
          ...link,
          postLink: _io.revertToArray(objLink),
        };
      });

      update._doc.targetAudience = _io.revertToArray(kpiAudience);
      update._doc.content = _io.revertToArray(postContent);
      update._doc.influencers = influencer;

      const withBrand = await this.store.Campaign.populate(update, {
        path: 'creator',
        model: 'Brand',
      });
      const withInfluencer = await this.store.Campaign.populate(withBrand, {
        path: 'influencer',
        model: 'Influencer',
      });

      return await this.store.Campaign.populate(withInfluencer, {
        path: 'campaignMetric',
        model: 'Metric',
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async getCampaigns() {
    try {
      const campaigns = await this.store.Campaign.find({});
      return campaigns.map((campaign) => {
        const kpiAudience = _io.MapToObj(campaign._doc.targetAudience);
        const postContent = _io.MapToObj(campaign._doc.content);
        const influencer = campaign._doc.influencers.map((link) => {
          const objLink = _io.MapToObj(link.postLink);
          return {
            ...link,
            postLink: _io.revertToArray(objLink),
          };
        });

        campaign._doc.targetAudience = _io.revertToArray(kpiAudience);
        campaign._doc.content = _io.revertToArray(postContent);
        campaign._doc.influencers = influencer;

        const withBrand = this.store.Campaign.populate(campaign, {
          path: 'creator',
          model: 'Brand',
        });
        const withInfluencer = this.store.Campaign.populate(withBrand, {
          path: 'influencer',
          model: 'Influencer',
        });
        return this.store.Campaign.populate(withInfluencer, {
          path: 'campaignMetric',
          model: 'Metric',
        });
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async getCampaign({id}) {
    try {
      const campaign = await this.store.Campaign.findById({_id: id});
      if (!campaign) {
        throw new Error('Campaign was not found');
      }

      const kpiAudience = _io.MapToObj(campaign._doc.targetAudience);
      const postContent = _io.MapToObj(campaign._doc.content);
      const influencer = campaign._doc.influencers.map((link) => {
        const objLink = _io.MapToObj(link.postLink);
        return {
          ...link,
          postLink: _io.revertToArray(objLink),
        };
      });

      campaign._doc.targetAudience = _io.revertToArray(kpiAudience);
      campaign._doc.content = _io.revertToArray(postContent);
      campaign._doc.influencers = influencer;

      const withBrand = await this.store.Campaign.populate(campaign, {
        path: 'creator',
        model: 'Brand',
      });
      const withInfluencer = await this.store.Campaign.populate(withBrand, {
        path: 'influencer',
        model: 'Influencer',
      });
      return await this.store.Campaign.populate(withInfluencer, {
        path: 'campaignMetric',
        model: 'Metric',
      });
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = Campaign;
