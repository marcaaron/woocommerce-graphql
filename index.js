const { ApolloServer, gql } = require('apollo-server');
const { ProductTypes, OrderTypes, OrderInputTypes, CouponType, CustomerType } = require('./Types');
const { Mutation, Query } = require('./resolvers');

const typeDefs = gql`
  type Query {
    products: [Product]
    customers: [Customer]
    productById(id: Int): Product
    productBySlug(slug: String): Product
    productsByTag(tag: String): [Product]
    reviewsByProductId(product_id: Int): [Review]
    coupons: [Coupon]
  }

  type Mutation {
    createPaidOrder(order: PaidOrderInput): Order
    createNewCustomer(customer: CustomerInput): Customer
  }
  ${CustomerType}
  ${CouponType}
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
