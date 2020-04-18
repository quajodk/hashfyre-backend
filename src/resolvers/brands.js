const _io = require('../../utils/_helpers');

module.exports = {
  Mutation: {
    createBrand: async (_, {inputs}, {Brand}) => {
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
        const brandExist = await Brand.findOne({email});
        if (brandExist) {
          throw new Error('Brand already exist');
        }

        // create brand
        const brand = await Brand.create({
          name,
          email,
          brandName,
          brandType,
          phone,
          brandWebsite,
          campaignBudget,
        });

        return brand;
      } catch (error) {
        throw new Error(error);
      }
    },
    updateBrand: async (_, {inputs}, {Brand}) => {
      try {
        const {_id} = inputs;
        // check for brand
        const isBrand = await Brand.findById({_id});

        if (!isBrand) {
          throw new Error('Brand was not found');
        }

        const updatedBrand = await Brand.findOneAndUpdate({_id}, inputs, {
          new: true,
        });

        return Brand.populate(updatedBrand, {path: 'user', model: 'User'});
      } catch (error) {
        throw new Error(error);
      }
    },
    deleteBrand: async (_, {id}, {Brand}) => {
      try {
        // check for brand
        const brandCheck = await Brand.findById({_id: id});
        if (!brandCheck) {
          throw new Error('Brand not found');
        }

        const deleted = await Brand.deleteOne({_id: id});
        if (!deleted) {
          throw new Error('Something went wrong try again later');
        }
        return {
          success: true,
          message: 'Brand deleted successfully',
        };
      } catch (error) {
        throw new Error(error);
      }
    },
  },
  Query: {
    getBrands: async (_, {}, {Brand}) => {
      try {
        const brands = await Brand.find({});
        return brands.map((brand) => {
          const addUser = Brand.populate(brand, {path: 'user', model: 'User'});
          return Brand.populate(addUser, {
            path: 'campaigns',
            model: 'Campaign',
          });
        });
      } catch (error) {
        throw new Error(error);
      }
    },
    getBrand: async (_, {id}, {Brand}) => {
      try {
        // check brand
        const isBrandExist = await Brand.findById({_id: id});
        if (!isBrandExist) {
          throw new Error('Brand was not found');
        }

        const brandWithUser = Brand.populate(isBrandExist, {
          path: 'user',
          model: 'User',
        });
        return Brand.populate(brandWithUser, {
          path: 'campaigns',
          model: 'Campaign',
        });
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};
