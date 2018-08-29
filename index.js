const { ApolloServer, gql } = require('apollo-server');
const { wcGet, wcPost } = require('./util/functions');

const typeDefs = gql`
  type Product {
    id: Int
    name: String
    slug: String
    permalink: String
    date_created: String
    date_created_gmt: String
    date_modified: String
    date_modified_gmt: String
    type: String
    status: String
    featured: Boolean
    catalog_visibility: String
    description: String
    short_description: String
    sku: String
    price: String
    regular_price: String
    sale_price: String
    date_on_sale_from: String
    date_on_sale_from_gmt: String
    date_on_sale_to: String
    date_on_sale_to_gmt: String
    price_html: String
    on_sale: Boolean
    purchasable: Boolean
    total_sales: Int
    virtual: Boolean
    downloadable: Boolean
    downloads: [Download]
    download_limit: Int
    download_expiry: Int
    external_url: String
    button_text: String
    tax_status: String
    tax_class: String
    manage_stock: Boolean
    stock_quantity: Int
    in_stock: Boolean
    backorders: String
    backorders_allowed: Boolean
    backordered: Boolean
    sold_individually: Boolean
    weight: String
    dimensions: Dimensions
    shipping_required: Boolean
    shipping_taxable: Boolean
    shipping_class: String
    shipping_class_id: Int
    reviews_allowed: Boolean
    average_rating: String
    rating_count: Int
    related_ids: [Int]
    upsell_ids: [Int]
    cross_sell_ids: [Int]
    parent_id: Int
    purchase_note: String
    categories: [Category]
    tags: [Tag]
    images: [Image]
    attributes: [Attribute]
    default_attributes: [DefaultAttribute]
    variations: [Int]
    grouped_products: [Int]
    menu_order: Int
    meta_data: [MetaData]
    reviews: [Review]
  }

  type Dimensions {
    length: String
    width: String
    height: String
  }

  type Image {
    id: Int
    date_created: String
    date_created_gmt: String
    date_modified: String
    date_modified_gmt: String
    src: String
    name: String
    alt: String
    position: Int
  }

  type Download {
    id: String
    name: String
    file: String
  }

  type Category {
    id: Int
    name: String
    slug: String
  }

  type DefaultAttribute {
    id: Int
    name: String
    option: String
  }

  type MetaData {
    id: Int
    key: String
    value: String
  }

  type Attribute {
    id: Int
    name: String
    position: Int
    visible: Boolean
    variation: Boolean
    options: [String]
  }

  type Tag {
    id: Int
    name: String
    slug: String
  }

  type Review {
    id: Int
    date_created: String
    date_created_gmt: String
    review: String
    rating: Int
    name: String
    email: String
    verified: Boolean
  }

  type Query {
    products: [Product]
    productById(id: Int): Product
    productBySlug(slug: String): Product
    productsByTag(tag: String): [Product]
    reviewsByProductId(product_id: Int): [Review]
  }

  input PaidOrderInput {
    payment_method: String
    payment_method_title: String
    set_paid: Boolean
    billing: BillingInput
    shipping: ShippingInput
    line_items: [LineItemInput]
    shipping_lines: [ShippingLineInput]
  }

  input ShippingLineInput {
    method_id: String
    method_title: String
    total: String
  }

  input LineItemInput {
    product_id: Int
    quantity: Int
    variation_id: Int
  }

  input BillingInput {
    first_name: String
    last_name: String
    address_1: String
    address_2: String
    city: String
    state: String
    postcode: String
    country: String
    email: String
    phone: String
  }

  input ShippingInput {
    first_name: String
    last_name: String
    address_1: String
    address_2: String
    city: String
    state: String
    postcode: String
    country: String
  }

  type Mutation {
    createPaidOrder(order: PaidOrderInput): Boolean
  }
`;

function reviewsSelected(info){
  const selections = info.fieldNodes[0].selectionSet.selections
  .filter(selection=>selection.name.value === 'reviews');
  return selections.length > 0;
}

const resolvers = {
  Mutation: {
    createPaidOrder: async (root, { order }, context, info) => {
      try {
        const placedOrder = await wcPost(`orders`, order);
        return true;
      }catch(e){
        console.log(e);
        return false;
      }
    }
  },
  Query: {
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
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
