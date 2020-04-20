/**
 * Helper functions for the App
 */

const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const _helper = {};

// hashing password
_helper.hash = (str) => {
  if (typeof str === 'string' && str.length > 0) {
    const hash = crypto
      .createHmac('sha256', process.env.JWT_SECRET)
      .update(str)
      .digest('hex');
    return hash;
  } else {
    return false;
  }
};

// generating token
_helper.generateToken = (user) => {
  if (typeof user === 'object' && Object.keys(user).length !== 0) {
    const token = jwt.sign(
      {id: user._id, userType: user.userType},
      process.env.JWT_SECRET,
      {expiresIn: '24h'}
    );
    return token;
  } else {
    return false;
  }
};

// validation checker
_helper.validate = (arg) => {
  return arg.forEach((element) => {
    if (typeof element !== 'string' || !element) {
      throw new Error('Please all fields are required');
    }
    return true;
  });
};

// convert array to object
_helper.convert = (arg) => {
  return arg.reduce((acc, cur) => {
    return {...acc, [Object.values(cur)[0]]: Object.values(cur)[1]};
  }, {});
};

_helper.revertToArray = (arg) => {
  return Object.entries(arg).map((value) => {
    const obj = {};
    obj.platform = value[0];
    obj.handle = value[1];
    return obj;
  });
};

_helper.MapToObj = (arg) => {
  return Array.from(arg).reduce(
    (obj, [platform, handle]) => Object.assign(obj, {[platform]: handle}),
    {}
  );
};

module.exports = _helper;
