export {};
const { wcGet, reviewsSelected } = require('../util/functions');
require('dotenv').config()
const fetch = require('node-fetch');

module.exports = {
  coupons: async ( ) => {
    let coupons = await wcGet('coupons');
    return coupons;
  },
  customers: async ( ) => {
    let customers = await wcGet('customers');
    return customers;
  },
  products: async (_:any, args:any, context:any, info:any) => {
    let products = await wcGet('products');
    if(reviewsSelected(info)){
      products = products.map( async (product:any) => {
        const reviews = await wcGet(`products/${product.id}/reviews`)
        product.reviews = reviews;
        return product;
      })
    }
    return products;
  },
  productById: async (_:any, {id}:{id:number}, context:any, info:any) => {
    let product = await wcGet(`products/${id}`);
    if(reviewsSelected(info)){
      const reviews = await wcGet(`products/${product.id}/reviews`)
      product.reviews = reviews;
      return product;
    }
    return product;
  },
  productBySlug: async (_:any, {slug}:{slug:string}, context:any, info:any) => {
    let product = await wcGet(`products/?&slug=${slug}`);
    product = product[0];
    if(reviewsSelected(info)){
      const reviews = await wcGet(`products/${product.id}/reviews`)
      product.reviews = reviews;
      return product;
    }
    return product;
  },
  reviewsByProductId: async (_:any, {product_id}:{product_id:string}) => {
    const productReviews = await wcGet(`products/${product_id}/reviews`);
    return productReviews;
  },
  productsByTag: async (_:any, {tag}:{tag:string}) => {
    // Tag = Tag ID as a String value! Not Tag Name!
    const products = await wcGet(`products/?&tag=${tag}`);
    return products;
  },
  login: async (_:any, {user}:{user:any}) => {
    const userLogin = await fetch(
      `${process.env.WOOCOMMERCE_ENDPOINT}/wp-json/jwt-auth/v1/token`,
      {
        method: 'post',
        body: JSON.stringify(user),
        headers: { 'Content-Type': 'application/json' }
      }
    )
    .then((res:any)=>res.json())
    .then((json:any)=>json);
    return userLogin;
  },
  currentCustomer: async (_:any, args:any, {user_id}:{user_id:number}) => {
    let user = await wcGet(`customers/${user_id}`);
    return user;
  }
}
