const { wcPost, reviewsSelected, validate } = require('../util/functions');
const { pubsub } = require('../pubsub');

module.exports = {
  createPaidOrder: async (root, { order }, context, info) => {
    try {
      const placedOrder = await wcPost(`orders`, order);
      pubsub.publish('ORDER_PLACED', { orderPlaced: order });
      return placedOrder;
    }catch(e){
      console.log(e);
      return e;
    }
  },
  createNewCustomer: async (root, { customer }, context, info) => {
    try {
      const newCustomer = await wcPost(`customers`, customer);
      return newCustomer;
    }catch(e){
      console.log(e);
      return e;
    }
  },
  cancelCustomerOrder: async (root, args, { token }, info) => {
    const validToken = await validate(token);
    return validToken;
  }
};
