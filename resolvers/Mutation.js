const { wcPost, reviewsSelected, validate } = require('../util/functions');
const { pubsub } = require('../pubsub');

module.exports = {
  createPaidOrder: async (root, { order }, {user_id}, info) => {
    if(!user_id){
      return "Cannot Place Order without Authentication";
    }else{
      try {
        const orderWithId = {...order};
        orderWithId.customer_id = user_id;
        const placedOrder = await wcPost(`orders`, orderWithId);
        pubsub.publish('ORDER_PLACED', { orderPlaced: orderWithId });
        return placedOrder;
      }catch(e){
        console.log(e);
        return e;
      }

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
