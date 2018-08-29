const { wcPost, reviewsSelected } = require('../util/functions');

module.exports = {
  createPaidOrder: async (root, { order }, context, info) => {
    try {
      const placedOrder = await wcPost(`orders`, order);
      return placedOrder;
    }catch(e){
      console.log(e);
      return false;
    }
  }
};
