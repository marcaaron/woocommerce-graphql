const { wcGet, reviewsSelected } = require('../util/functions');
require('dotenv').config()
const axios = require('axios');

module.exports = {
  coupons: async (root, args, context, info) => {
    let coupons = await wcGet('coupons');
    return coupons;
  },
  customers: async (root, args, context, info) => {
    let customers = await wcGet('customers');
    return customers;
  },
  products: async (root, args, context, info) => {
    let products = await wcGet('products');
    if(reviewsSelected(info)){
      products = products.map( async (product) => {
        const reviews = await wcGet(`products/${product.id}/reviews`)
        product.reviews = reviews;
        return product;
      })
    }
    return products;
  },
  productById: async (root, {id}, context, info) => {
    let product = await wcGet(`products/${id}`);
    if(reviewsSelected(info)){
      const reviews = await wcGet(`products/${product.id}/reviews`)
      product.reviews = reviews;
      return product;
    }
    return product;
  },
  productBySlug: async (root, {slug}, context, info) => {
    let product = await wcGet(`products/?&slug=${slug}`);
    product = product[0];
    if(reviewsSelected(info)){
      const reviews = await wcGet(`products/${product.id}/reviews`)
      product.reviews = reviews;
      return product;
    }
    return product;
  },
  reviewsByProductId: async (root, {product_id}, context, info) => {
    const productReviews = await wcGet(`products/${product_id}/reviews`);
    return productReviews;
  },
  productsByTag: async (root, {tag}, context, info) => {
    // Tag = Tag ID as a String value! Not Tag Name!
    const products = await wcGet(`products/?&tag=${tag}`);
    return products;
  },
  logIn: async (root, {user}, context, info) => {
    let userLogin = await axios.post(
      `${process.env.WOOCOMMERCE_ENDPOINT}/wp-json/jwt-auth/v1/token`,
      user
    );
    const { data } = userLogin;
    return data;
  },
  currentCustomer: async (root, args, {user_id}, info) => {
    let user = await wcGet(`customers/${user_id}`);
    return user;
  }
}