const _io = require('../../utils/_helpers');

module.exports = {
  createInfluencer: async (_, {inputs}, {User, Influencer, Token}) => {
    try {
      const {email, password, name, socialMediaHandle} = inputs;
      // check required fields
      _io.validate([email, password]);

      // create user for influencer
      const emailCheck = await User.findOne({email});

      if (emailCheck) {
        throw new Error('Email already exist');
      }

      // hash password
      const hashPassword = _io.hash(password);
      if (!hashPassword) {
        throw new Error('Something went wrong try again');
      }

      const newUser = await User.create({
        email,
        password: hashPassword,
        userType: 'influencer',
      });

      if (newUser) {
        // create influencer
        const newInfluencer = await Influencer.create({
          user: newUser._id,
          email,
          name,
          socialMediaHandle,
          createdAt: Date.now(),
        });

        //   login user
        if (newInfluencer) {
          const token = _io.generateToken(userExist);
          const userToken = await Token.create({
            user: newUser._id,
            token,
            userType: 'influencer',
            login: true,
            isActive: true,
          });

          const login = Token.populate(userToken, {
            path: 'user',
            model: 'User',
          });

          const influencer = Influencer.populate(newInfluencer, {
            path: 'user',
            model: 'Users',
          });

          return {
            login,
            influencer,
          };
        }
      }
    } catch (error) {
      throw new Error(error);
    }
  },
  updateInfluencer: async (_, {inputs}, {Influencer}) => {
    try {
      const {_id} = inputs;
      // check influencer
      const influencerCheck = await Influencer.findById({_id});
      if (!influencerCheck) {
        throw new Error('Influencer not found');
      }

      inputs.updatedAt = Date.now();
      const updated = await Influencer.findOneAndUpdate({_id}, inputs, {
        new: true,
      });
      const withUser = Influencer.populate(updated, {
        path: 'user',
        model: 'User',
      });
      return Influencer.populate(withUser, {
        path: 'joinedCampaigns',
        model: 'Campaign',
      });
    } catch (error) {
      throw new Error(error);
    }
  },

  getInfluencers: async (_, {}, {Influencer}) => {
    try {
      const influencers = await Influencer.find({});
      return influencers.map((influencer) => {
        const withUser = Influencer.populate(influencer, {
          path: 'user',
          model: ' user',
        });
        return Influencer.populate(withUser, {
          path: 'joinedCampaigns',
          model: 'Campaign',
        });
      });
    } catch (error) {
      throw new Error(error);
    }
  },

  getInfluencer: async (_, {id}, {Influencer}) => {
    try {
      // check influencer
      const checkInfluencer = await Influencer.findById({_id: id});
      if (!checkInfluencer) {
        throw new Error('Influencer was not found');
      }

      const withUser = Influencer.populate(checkInfluencer, {
        path: 'user',
        model: 'User',
      });
      return Influencer.populate(withUser, {
        path: 'joinedCampaigns',
        model: 'Campaign',
      });
    } catch (error) {
      throw new Error(error);
    }
  },
};
