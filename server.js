const fs = require('fs');
const path = require('path');
const {ApolloServer} = require('apollo-server');
const resolvers = require('./src/resolvers');

require('dotenv').config({path: './utils/config.env'});

const dataSources = require('./src/datasources');

const schemaPath = path.resolve(__dirname, './src/schema.gql');
const typeDefs = fs.readFileSync(schemaPath, 'utf-8');

const app = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources,
});

const PORT = process.env.PORT;

app.listen(PORT).then(({url}) => console.log(`😂 Server start at ${url} 🚀`));
