require('dotenv').config();
const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');

// Apollo Server
const typeDefs = require('./gql/typeDefs');
const resolvers = require('./gql/resolvers');
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req })
});
// Mongo DB
const {
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_NAME
} = process.env;

const mongoURI = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`;

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .then(() => server.listen(3000, () => console.log('GQL listening http://localhost:3000')))
  .catch(err => console.error(err));