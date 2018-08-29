export {};
require('dotenv').config();
const fetch = require('node-fetch');
const wcAPI = require('woocommerce-api');
const base64 = require('base-64');

const wc = new wcAPI({
  url: process.env.WOOCOMMERCE_ENDPOINT,
  consumerKey: process.env.CONSUMER_KEY,
  consumerSecret: process.env.CONSUMER_SECRET,
  wpAPI: true,
  version: 'wc/v2'
});

const wcGet = async (endpoint:string) => {
  const payload = await wc.getAsync(endpoint);
  return JSON.parse(payload.toJSON().body);
}

const wcPost = async (endpoint:string, data:any) => {
  const payload = await wc.postAsync(endpoint, data);
  return JSON.parse(payload.toJSON().body);
}

type Info = {
  fieldNodes:[{
    selectionSet:{
      selections:[{
        name: {
          value: string
        }
      }]
    }
  }]
};

const reviewsSelected = (info:Info): boolean => {
  const selections = info.fieldNodes[0].selectionSet.selections
  .filter((selection:{name: {value: string}}) => selection.name.value === 'reviews');
  return selections.length > 0;
}

const validate = async (token: string) => {
  const result:number = await fetch(`${process.env.WOOCOMMERCE_ENDPOINT}/wp-json/jwt-auth/v1/token/validate`, {
    method: 'post',
    headers: {
      'Authorization': token
    }
  })
  .then((res:any) => res.json())
  .then((json:{data:{status:number}}) => json.data.status);
  return result !== 200 ? false : true;
}

const getUser = (token:string) => {
  try {
    const tokenParse = JSON.parse(base64.decode(token.split('.')[1]));
    const userId = tokenParse.data.user.id;
    return userId;
  } catch(e){
    console.log(e);
    return null;
  }
}

module.exports = {
  wcGet, wcPost, reviewsSelected, validate, getUser
}
