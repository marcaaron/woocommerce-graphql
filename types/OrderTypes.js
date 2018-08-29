module.exports = `
  type Order {
    id: Int
    parent_id: Int
    number: String
    order_key: String
    created_via: String
    version: String
    status: String
    currency: String
    date_created: String
    date_created_gmt: String
    date_modified: String
    date_modified_gmt: String
    discount_total: String
    discount_tax: String
    shipping_total: String
    shipping_tax: String
    cart_tax: String
    total: String
    total_tax: String
    prices_include_tax: Boolean
    customer_id: Int
    customer_ip_address: String
    customer_user_agent: String
    customer_note: String
    billing: Billing
    shipping: Shipping
    payment_method: String
    payment_method_title: String
    transaction_id: String
    date_paid: String
    date_paid_gmt: String
    date_completed: String
    date_completed_gmt: String
    cart_hash: String
    meta_data: [MetaData]
    line_items: [LineItem]
    shipping_lines: [ShippingLine]
    fee_lines: [FeeLine]
    coupon_lines: [CouponLine]
    refunds: [Refund]
  }

  type Billing {
    first_name: String
    last_name: String
    company: String
    address_1: String
    address_2: String
    city: String
    state: String
    postcode: String
    country: String
    email: String
    phone: String
  }

  type LineItem {
    id: Int
    name: String
    product_id: Int
    variation_id: Int
    quantity: Int
    tax_class: Int
    subtotal: String
    subtotal_tax: String
    total: String
    total_tax: String
    taxes: [Tax]
    meta_data: [MetaData]
    sku: String
    price: String
  }

  type Tax {
    id: Int
    rate_code: String
    rate_id: String
    label: String
    compound: Boolean
    tax_total: String
    shipping_tax_total: String
    meta_data: [MetaData]
  }

  type Shipping {
    first_name: String
    last_name: String
    company: String
    address_1: String
    address_2: String
    city: String
    state: String
    postcode: String
    country: String
  }

  type ShippingLine {
    id: Int
    method_title: String
    method_id: String
    total: String
    total_tax: String
    taxes: [Tax]
    meta_data: [MetaData]
  }

  type FeeLine {
    id: Int
    name: String
    tax_class: String
    tax_status: String
    total: String
    total_tax: String
    taxes: [Tax]
    meta_data: [MetaData]
  }

  type CouponLine {
    id: Int
    code: String
    discount: String
    discount_tax: String
    meta_data: [MetaData]
  }

  type Refund {
    id: Int
    reason: String
    total: String
  }
`;
