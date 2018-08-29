export {};
const { ApolloServer, gql } = require('apollo-server');
const { ProductTypes, OrderTypes, OrderInputTypes, CouponType, CustomerType } = require('./Types');
const { Mutation, Query } = require('./resolvers');
const { getUser } = require('./util/functions');

const typeDefs = gql`
  type Query {
    products: [Product]
    customers: [Customer]
    productById(id: Int): Product
    productBySlug(slug: String): Product
    productsByTag(tag: String): [Product]
    reviewsByProductId(product_id: Int): [Review]
    coupons: [Coupon]
    login(user:UserInput): User
    signup(user:UserInput): User
    currentCustomer: Customer
  }

  input UserInput {
    username: String
    password: String
  }

  type User {
    user_email: String
    user_nicename: String
    user_display_name: String
    token: String
  }

  type Mutation {
    createPaidOrder(order: PaidOrderInput): Order
    createNewCustomer(customer: CustomerInput): Customer
    cancelCustomerOrder(order_id: Int): Boolean
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

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({req}:{req:{headers: {authorization: string}}}) => {
    const token = req.headers.authorization || '';
    let user_id;
    if(token){
      user_id = getUser(token);
    }
    return { token, user_id };
  }
});

server.listen().then(({url}:{url:string}) => {
  console.log(`🚀  Server ready at ${url}`);
});
