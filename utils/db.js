const mongoose = require('mongoose');
const {
  User,
  Brand,
  Influencer,
  Token,
  Campaign,
  NewsMonitor,
  Metric,
} = require('../src/models');

const createStore = () => {
  try {
    const conn = mongoose
      .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      })
      .then((conn) => {
        console.log(`MongoDB Connected: ${conn.connection.host}`);
      })
      .catch((err) => console.log(err));

    return {
      conn,
      User,
      Brand,
      Influencer,
      Token,
      Campaign,
      NewsMonitor,
      Metric,
    };
  } catch (err) {
    console.log(`Error: ${err.message}`);
    process.exit(1);
  }
};

module.exports = {createStore};
