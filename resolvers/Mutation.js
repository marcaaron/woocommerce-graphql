const { wcPost, reviewsSelected } = require('../util/functions');

module.exports = {
  createPaidOrder: async (root, { order }, context, info) => {
    try {
      const placedOrder = await wcPost(`orders`, order);
      console.log(placedOrder);
      return placedOrder;
    }catch(e){
      console.log(e);
      return e;
    }
  },
  createNewCustomer: async (root, { customer }, context, info) => {
    try {
      const newCustomer = await wcPost(`customers`, customer);
      console.log(newCustomer);
      return newCustomer;
    }catch(e){
      console.log(e);
      return e;
    }
  }

};
