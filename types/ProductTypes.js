module.exports = `
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
`;
