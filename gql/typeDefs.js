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
  input loginInput {
    username: String!
    password: String!
  }
  type chat {
    id: ID!
    users: [user]!
  }
  type message {
    id: ID!
    body: String!
    createdAt: String!
    username: String!
    conversation: chat!
  }
  type Query {
    getMessage: String!
    getMessages(chatId: ID!): [message]!
    getChats: [chat]!
  }
  type Mutation {
    register(input: registerInput!): user!
    login(input: loginInput!): user!
    createChat(messageTo: ID!): chat!
    createMessage(body: String!, chatId: ID!): message!
    deleteMessage(messageId: ID!): String!
  }
  type Subscription {
    newMessage(chatId: ID!): message!
  }
`;