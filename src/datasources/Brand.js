const { DataSource } = require("apollo-datasource");
const _io = require("../../utils/_helpers");

class Brand extends DataSource {
  constructor({ store }) {
    super();
    this.store = store;
  }

  initialize(config) {
    this.context = config.context;
  }

  async createBrand({ inputs }) {
    try {
      const {
        name,
        email,
        phone,
        brandName,
        brandType,
        brandWebsite,
        campaignBudget,
      } = inputs;

      // validate fields
      _io.validate([name, email, phone, brandName]);

      // check if brand exist
      const brandExist = await this.store.Brand.findOne({ email });
      if (brandExist) {
        throw new Error("Brand already exist");
      }

      // create brand
      const newBrand = await new this.store.Brand({
        name,
        email,
        brandName,
        brandType,
        phone,
        brandWebsite,
        campaignBudget,
      }).save();

      return newBrand || {};
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateBrand({ inputs }) {
    try {
      const { _id } = inputs;
      // check for brand
      const isBrand = await this.store.Brand.findById({ _id });

      if (!isBrand) {
        throw new Error("Brand was not found");
      }

      const updatedBrand = await this.store.Brand.findOneAndUpdate(
        { _id },
        inputs,
        {
          new: true,
        }
      );

      return Brand.populate(updatedBrand, { path: "user", model: "User" });
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteBrand({ id }) {
    try {
      // check for brand
      const brandCheck = await this.store.Brand.findById({ _id: id });
      if (!brandCheck) {
        throw new Error("Brand not found");
      }

      const deleted = await this.store.Brand.deleteOne({ _id: id });
      if (!deleted) {
        throw new Error("Something went wrong try again later");
      }
      return {
        success: true,
        message: "Brand deleted successfully",
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  async getBrands() {
    try {
      const brands = await this.store.Brand.find({});
      return brands.map((brand) => {
        const addUser = this.store.Brand.populate(brand, {
          path: "user",
          model: "User",
        });
        return this.store.Brand.populate(addUser, {
          path: "campaigns",
          model: "Campaign",
        });
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async getBrand({ id }) {
    try {
      // check brand
      const isBrandExist = await this.store.Brand.findById({ _id: id });
      if (!isBrandExist) {
        throw new Error("Brand was not found");
      }

      const brandWithUser = this.store.Brand.populate(isBrandExist, {
        path: "user",
        model: "User",
      });
      return this.store.Brand.populate(brandWithUser, {
        path: "campaigns",
        model: "Campaign",
      });
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = Brand;
