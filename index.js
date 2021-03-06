const { ApolloServer, gql } = require('apollo-server');
const { ProductTypes, OrderTypes, OrderInputTypes, CouponType, CustomerType } = require('./Types');
const { Mutation, Query } = require('./resolvers');
const { getUser } = require('./util/functions');
const { pubsub } = require('./pubsub');

const typeDefs = gql`
  type Subscription {
    orderPlaced: Order
  }

  type Query {
    products: [Product]
    customers: [Customer]
    productById(id: Int): Product
    productBySlug(slug: String): Product
    productsByTag(tag: String): [Product]
    reviewsByProductId(product_id: Int): [Review]
    coupons: [Coupon]
    login(user:UserInput): User
    currentCustomer: Customer
    currentCustomerOrders: [Order]
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
  Query,
  Subscription: {
    orderPlaced: {
      resolve: (payload) => payload.orderPlaced,
      subscribe: () => pubsub.asyncIterator('ORDER_PLACED')
    },
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({req, connection}) => {
    if(connection) {
      return { }
    }else{
      const token = req.headers.authorization || '';
      if(token){
        const user_id = getUser(token);
        return { token, user_id };
      }else{
        return { }
      }
    }
  },
  playground: {
    settings: {
      'editor.theme': 'light',
    },
  },
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
