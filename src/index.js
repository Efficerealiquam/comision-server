const { ApolloServer } = require("apollo-server");
require("dotenv").config();
require("./database"); /* DATABASE */
const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen({ port: process.env.PORT || 3500 }).then((res) => {
  console.log("Server runing on port ", res.port);
});
