const { ApolloServer, gql } = require('apollo-server');
const { ProductTypes, OrderTypes, OrderInputTypes } = require('./Types');
const { Mutation, Query } = require('./resolvers');

const typeDefs = gql`
  type Query {
    products: [Product]
    productById(id: Int): Product
    productBySlug(slug: String): Product
    productsByTag(tag: String): [Product]
    reviewsByProductId(product_id: Int): [Review]
  }

  type Mutation {
    createPaidOrder(order: PaidOrderInput): Order
  }

  ${OrderTypes}
  ${ProductTypes}
  ${OrderInputTypes}
`;

const resolvers = {
  Mutation,
  Query
};

const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
