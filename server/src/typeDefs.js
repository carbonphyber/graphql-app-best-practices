/* eslint-env node */
const { gql } = require('apollo-server');

// The GraphQL schema
const typeDefs = gql`
  type Query {
    hello: String,
    notificationsCount: Int,
  }
  type Mutation {
    clearNotificationsCount: Boolean,
  }
`;


module.exports = {
  typeDefs,
};
