const {DataSource} = require('apollo-datasource');
const _io = require('../../utils/_helpers');

class Auth extends DataSource {
  constructor({store}) {
    super();
    this.store = store;
  }

  initialize(config) {
    this.context = config.context;
  }

  async login({inputs}) {
    try {
      const {email, password, userType} = inputs;
      _io.validate([email, password]);
      // check if user exist
      const userExist = await this.store.User.findOne({email});

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
      const userToken = await this.store.Token.create({
        user: userExist._id,
        token,
        userType: userType,
        login: true,
        isActive: true,
      });

      return await this.store.Token.populate(userToken, {
        path: 'user',
        model: 'User',
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async createUser({inputs}) {
    try {
      const {email, password, userType} = inputs;
      _io.validate([email, password]);

      //  check if email exist
      const isAvailable = await this.store.User.findOne({email});
      if (isAvailable) {
        throw new Error('User with email already exist');
      }

      //   hash password and create user
      const hashPassword = _io.hash(password);
      if (!hashPassword) {
        throw new Error('Something went wrong on the server ...try again');
      }

      const newUser = await this.store.User.create({
        email,
        password: hashPassword,
        userType,
      });

      // if user is brand update brand data
      if (userType === 'brand') {
        await this.store.Brand.updateOne(
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
  }

  async signOut({id}) {
    try {
      const isToken = await this.store.Token.findById({_id: id});
      if (isToken) {
        throw new Error('There is no current token');
      }

      await this.store.Token.deleteOne({_id: id});
      return {};
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = Auth;
