const _io = require('../../utils/_helpers');

module.exports = {
  Mutation: {
    createCampaign: async (_, {inputs}, {Campaign, Brand}) => {
      try {
        const {
          email,
          campaignId,
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
        } = inputs;
        // check for creator
        const isBrand = await Brand.findOne({email});
        if (!isBrand) {
          throw new Error('Can not create campaign');
        }

        const campaignExist = await Campaign.findOne({campaignId});
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

        const createdCampaign = await Campaign.create(campaign);

        // revert to array of kay vale
        createdCampaign.targetAudience = _io.revertToArray(
          createdCampaign.targetAudience
        );
        createdCampaign.content = _io.revertToArray(...createdCampaign.content);

        return Campaign.populate(createdCampaign, {
          path: 'creator',
          model: 'Brand',
        });
      } catch (error) {
        throw new Error(error);
      }
    },
    updateCampaign: async (_, {inputs}, {Campaign}) => {
      try {
        const {_id} = inputs;
        // check campaign
        const campaignCheck = await Campaign.findById({_id});
        if (!campaignCheck) {
          throw new Error('Campaign not found');
        }

        const update = await Campaign.findOneAndUpdate({_id}, inputs, {
          new: true,
        });
        const withBrand = Campaign.populate(update, {
          path: 'creator',
          model: 'Brand',
        });
        const withInfluencer = Campaign.populate(withBrand, {
          path: 'influencer',
          model: 'Influencer',
        });
        return Campaign.populate(withInfluencer, {
          path: 'campaignMetric',
          model: 'Metric',
        });
      } catch (error) {
        throw new Error(error);
      }
    },
  },
  Query: {
    getCampaigns: async (_, {}, {Campaign}) => {
      try {
        const campaigns = await Campaign.find({});
        return campaigns.map((campaign) => {
          const withBrand = Campaign.populate(campaign, {
            path: 'creator',
            model: 'Brand',
          });
          const withInfluencer = Campaign.populate(withBrand, {
            path: 'influencer',
            model: 'Influencer',
          });
          return Campaign.populate(withInfluencer, {
            path: 'campaignMetric',
            model: 'Metric',
          });
        });
      } catch (error) {
        throw new Error(error);
      }
    },
    getCampaign: async (_, {id}, {Campaign}) => {
      try {
        const campaign = await Campaign.findById({_id: id});
        if (!campaign) {
          throw new Error('Campaign was not found');
        }

        const withBrand = Campaign.populate(campaign, {
          path: 'creator',
          model: 'Brand',
        });
        const withInfluencer = Campaign.populate(withBrand, {
          path: 'influencer',
          model: 'Influencer',
        });
        return Campaign.populate(withInfluencer, {
          path: 'campaignMetric',
          model: 'Metric',
        });
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};
