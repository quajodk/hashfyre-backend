module.exports = {
  Query: {
    users: async (_, {}, {User}) => {
      try {
        const users = await User.find({});
        if (!user) {
          throw new Error('No available users');
        }

        return users;
      } catch (error) {
        throw new Error(error);
      }
    },
    user: async (_, {id}, {User}) => {
      try {
        const user = await User.findById({_id: id});
        if (!user) {
          throw new Error('User not found');
        }

        return user;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
  Mutation: {
    updateUser: async (_, {inputs}, {User}) => {
      try {
        const {id} = inputs;
        // check if user exist
        const isUser = await User.findById({_id: id});
        if (!isUser) {
          throw new Error('User not found');
        }

        // update user
        const updatedUser = await User.findOneAndUpdate({_id: id}, inputs, {
          new: true,
        });

        return updatedUser;
      } catch (error) {
        throw new Error(error);
      }
    },
    deleteUser: async (_, {id}, {user}) => {
      try {
        //   check for user
        const user = await User.findById({_id: id});

        if (!user) {
          throw new Error('User not found');
        }

        const deleted = await deleteOne({_id: id});
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
    },
  },
};
