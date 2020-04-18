const mongoose = require("mongoose");
const {
  User,
  Brand,
  Influencer,
  Token,
  Campaign,
  NewsMonitor,
  Metric,
} = require("../src/models");

const createStore = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);

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
};  useCreateIndex: true,

module.exports = { createStore };
