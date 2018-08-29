require('dotenv').config()
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

const wcGet = async (endpoint) => {
  const payload = await wc.getAsync(endpoint);
  return JSON.parse(payload.toJSON().body);
}

const wcPost = async (endpoint, data) => {
  const payload = await wc.postAsync(endpoint, data);
  return JSON.parse(payload.toJSON().body);
}

const reviewsSelected = (info) => {
  const selections = info.fieldNodes[0].selectionSet.selections
  .filter(selection=>selection.name.value === 'reviews');
  return selections.length > 0;
}

const validate = async (token) => {
  const result = await fetch(`${process.env.WOOCOMMERCE_ENDPOINT}/wp-json/jwt-auth/v1/token/validate`, {
    method: 'post',
    headers: {
      'Authorization': token
    }
  })
  .then(res=>res.json())
  .then(json=>json.data.status);
  return result !== 200 ? false : true;
}

const getUser = (token) => {
  const tokenParse = JSON.parse(base64.decode(token.split('.')[1]));
  const userId = tokenParse.data.user.id;
  return userId;
}

module.exports = {
  wcGet, wcPost, reviewsSelected, validate, getUser
}
