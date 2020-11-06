const gql = require('graphql-tag');

module.exports = gql`
  type user {
    id: ID!
    username: String!
    createdAt: String!
    password: String!
    token: String!
    email: String!
  }
  input registerInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }
  type message {
    id: ID!
    body: String!
    createdAt: String!
    username: String!
  }
  type Query {
    getMessage: String!
    getMessages: [message]!
  }
  type Mutation {
    register(input: registerInput!): user!
    createMessage(body: String!): message!
  }
`;