const messageResolver = require('./message');
const userResolver = require('./users');
const chatResolver = require('./chat');

module.exports = {
  Query: {
    ...messageResolver.Query,
    ...chatResolver.Query
  },
  Mutation: {
    ...userResolver.Mutation,
    ...messageResolver.Mutation,
    ...chatResolver.Mutation
  }
}