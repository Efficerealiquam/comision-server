const productosResolvers = require("./productos");
const listasResolvers = require("./lista");
module.exports = {
  Query: {
    ...productosResolvers.Query,
    ...listasResolvers.Query,
  },
  Mutation: {
    ...productosResolvers.Mutation,
    ...listasResolvers.Mutation,
  },
};
