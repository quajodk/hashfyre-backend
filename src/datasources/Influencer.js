const { DataSource } = require("apollo-datasource");
const _io = require("../../utils/_helpers");

class Influencer extends DataSource {
  constructor({ store }) {
    super();
    this.store = store;
  }

  initialize(config) {
    this.context = config.context;
  }

  async createInfluencer({ inputs }) {
    try {
      const { email, password, name, socialMediaHandle } = inputs;
      // check required fields
      _io.validate([email, password]);

      // create user for influencer
      const emailCheck = await this.store.User.findOne({ email });

      if (emailCheck) {
        throw new Error("Email already exist");
      }

      // hash password
      const hashPassword = _io.hash(password);
      if (!hashPassword) {
        throw new Error("Something went wrong try again");
      }

      const newUser = await this.store.User.create({
        email,
        password: hashPassword,
        userType: "influencer",
      });

      if (newUser) {
        // create influencer
        const newInfluencer = await this.store.Influencer.create({
          user: newUser._id,
          email,
          name,
          socialMediaHandle,
          createdAt: Date.now(),
        });

        //   login user
        if (newInfluencer) {
          const token = _io.generateToken(userExist);
          const userToken = await this.store.Token.create({
            user: newUser._id,
            token,
            userType: "influencer",
            login: true,
            isActive: true,
          });

          const login = this.store.Token.populate(userToken, {
            path: "user",
            model: "User",
          });

          const influencer = this.store.Influencer.populate(newInfluencer, {
            path: "user",
            model: "Users",
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
  }

  async updateInfluencer({ inputs }) {
    try {
      const { _id } = inputs;
      // check influencer
      const influencerCheck = await this.store.Influencer.findById({ _id });
      if (!influencerCheck) {
        throw new Error("Influencer not found");
      }

      inputs.updatedAt = Date.now();
      const updated = await this.store.Influencer.findOneAndUpdate(
        { _id },
        inputs,
        {
          new: true,
        }
      );
      const withUser = this.store.Influencer.populate(updated, {
        path: "user",
        model: "User",
      });
      return this.store.Influencer.populate(withUser, {
        path: "joinedCampaigns",
        model: "Campaign",
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async getInfluencers() {
    try {
      const influencers = await this.store.Influencer.find({});
      return influencers.map((influencer) => {
        const withUser = this.store.Influencer.populate(influencer, {
          path: "user",
          model: " user",
        });
        return this.store.Influencer.populate(withUser, {
          path: "joinedCampaigns",
          model: "Campaign",
        });
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async getInfluencer({ id }) {
    try {
      // check influencer
      const checkInfluencer = await this.store.Influencer.findById({ _id: id });
      if (!checkInfluencer) {
        throw new Error("Influencer was not found");
      }

      const withUser = this.store.Influencer.populate(checkInfluencer, {
        path: "user",
        model: "User",
      });
      return this.store.Influencer.populate(withUser, {
        path: "joinedCampaigns",
        model: "Campaign",
      });
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = Influencer;
