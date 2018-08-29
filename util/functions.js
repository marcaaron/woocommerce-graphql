require('dotenv').config()

const wcAPI = require('woocommerce-api');

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

module.exports = {
  wcGet, wcPost
}
