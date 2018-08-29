module.exports = `
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
`
