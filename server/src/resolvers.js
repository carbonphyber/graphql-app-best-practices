/* eslint-env node */
let helloCount = 0;

// A map of functions which return data for the schema.
const resolvers = {
  Query: {
    hello: () => 'world',
    notificationsCount: () => {
      if (Math.random() > 0.5) {
        helloCount += 1;
      }
      return helloCount;
    },
  },
  Mutation: {
    clearNotificationsCount: () => {
      helloCount = 0;
      return true;
    },
  },
};

module.exports = {
  resolvers,
};
