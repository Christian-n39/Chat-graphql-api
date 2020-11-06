const messageResolver = require('./message');
const userResolver = require('./users');

module.exports = {
  Query: {
    ...messageResolver.Query
  },
  Mutation: {
    ...userResolver.Mutation
  }
}