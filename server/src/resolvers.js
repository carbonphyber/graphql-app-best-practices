/* eslint-env node */
let helloCount = 0;

// A map of functions which return data for the schema.
const resolvers = {
  Query: {
    hello: () => 'world',
    notificationsCount: () => helloCount++,
  },
};

module.exports = {
  resolvers,
};
