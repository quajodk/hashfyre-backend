const fs = require('fs');
const path = require('path');
const {ApolloServer} = require('apollo-server');
const connectDB = require('./utils/db');
const resolvers = require('./src/resolvers');
const {
  User,
  Brand,
  Influencer,
  Token,
  Campaign,
  NewsMonitor,
  Metric,
} = require('./src/models');
require('dotenv').config({path: './utils/config.env'});

connectDB();

const schemaPath = path.resolve(__dirname, './src/schema.gql');
const typeDefs = fs.readFileSync(schemaPath, 'utf-8');

const app = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    User,
    Brand,
    Influencer,
    Token,
    Campaign,
    NewsMonitor,
    Metric,
  },
});

const PORT = process.env.PORT;

app.listen(PORT).then(({url}) => console.log(`😂 Server start at ${url} 🚀`));
