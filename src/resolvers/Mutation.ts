const { wcPost, reviewsSelected, validate } = require('../util/functions');

module.exports = {
  createPaidOrder: async (_:Object, { order }:{order:string}) => {
    try {
      const placedOrder = await wcPost(`orders`, order);
      return placedOrder;
    }catch(e){
      console.log(e);
      return e;
    }
  },
  createNewCustomer: async (_:Object, {customer}:{customer:Object}) => {
    try {
      const newCustomer = await wcPost(`customers`, customer);
      return newCustomer;
    }catch(e){
      console.log(e);
      return e;
    }
  },
  cancelCustomerOrder: async (_:Object, _args:null, {token}:{token:string}) => {
    const validToken = await validate(token);
    return validToken;
  }
};
