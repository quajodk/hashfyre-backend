const {DataSource} = require('apollo-datasource');

class User extends DataSource {
  constructor({store}) {
    super();
    this.store = store;
  }

  initialize(config) {
    this.context = config.context;
  }

  async updateUser({inputs}) {
    try {
      const {id} = inputs;
      // check if user exist
      const isUser = await this.store.User.findById({_id: id});
      if (!isUser) {
        throw new Error('User not found');
      }

      // update user
      const updatedUser = await this.store.User.findOneAndUpdate(
        {_id: id},
        inputs,
        {
          new: true,
        }
      );

      return updatedUser;
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteUser({id}) {
    try {
      //   check for user
      const user = await this.store.User.findById({_id: id});

      if (!user) {
        throw new Error('User not found');
      }

      const deleted = await this.store.User.deleteOne({_id: id});
      if (!deleted) {
        throw new Error('Something went wrong try again later');
      }
      return {
        success: true,
        message: 'User deleted successfully',
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  async getUsers() {
    try {
      const users = await this.store.User.find({});
      if (!users) {
        throw new Error('No available users');
      }

      return users;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getUser({id}) {
    try {
      const user = await this.store.User.findById({_id: id});
      if (!user) {
        throw new Error('User not found');
      }

      return user;
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = User;
