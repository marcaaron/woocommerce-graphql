const { PubSub } = require('apollo-server');
const pubsub = new PubSub();

const actions = {
  ORDER_PLACED: 'ORDER_PLACED'
}

module.exports = { pubsub, actions };
