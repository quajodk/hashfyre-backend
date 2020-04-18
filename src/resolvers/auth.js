const _io = require('../../utils/_helpers');

module.exports = {
  Mutation: {
    login: async (_, {inputs}, {User, Token}) => {
      try {
        const {email, password, userType} = inputs;
        _io.validate([...inputs]);
        // check if user exist
        const userExist = await User.findOne({email});
        console.log(userExist);
        if (!userExist) {
          throw new Error('No user found');
        }

        // verify password
        const isPassword = userExist.password === _io.hash(password);
        if (!isPassword) {
          throw new Error('Invalid password');
        }

        // create token
        const token = _io.generateToken(userExist);
        const userToken = await Token.create({
          user: userExist._id,
          token,
          userType: userType,
          login: true,
          isActive: true,
        });

        return await Token.populate(userToken, {
          path: 'user',
          model: 'User',
        });
      } catch (error) {
        throw new Error(error);
      }
    },
    createUser: async (_, {inputs}, {User, Brand}) => {
      try {
        const {email, password, userType} = inputs;
        _io.validate([...inputs]);

        //  check if email exist
        const isAvailable = await User.findOne({email});
        if (isAvailable) {
          throw new Error('User with email already exist');
        }

        //   hash password and create user
        const hashPassword = _io.hash(password);
        if (!hashPassword) {
          throw new Error('Something went wrong on the server ...try again');
        }

        const newUser = await User.create({
          email,
          password: hashPassword,
          userType,
        });

        // if user is brand update brand data
        if (userType === 'brand') {
          await Brand.updateOne(
            {email},
            {
              $set: {
                user: newUser._id,
              },
            }
          );
        }

        return newUser;
      } catch (error) {
        throw new Error(error);
      }
    },
    signOut: async (_, {id}, {Token}) => {
      try {
        const isToken = await Token.findById({_id: id});
        if (isToken) {
          throw new Error('There is no current token');
        }

        await Token.deleteOne({_id: id});
        return {};
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};
