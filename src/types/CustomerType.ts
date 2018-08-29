module.exports = `
  type Customer {
    id: Int
    date_created: String
    date_created_gmt: String
    date_modified: String
    date_modified_gmt: String
    email: String
    first_name: String
    last_name: String
    role: String
    username: String
    billing: Billing
    shipping: Shipping
    is_paying_customer: Boolean
    orders_count: Int
    total_spent: String
    avatar_url: String
    meta_data: [MetaData]
  }

  input CustomerInput {
    email: String
    first_name: String
    last_name: String
    username: String
    password: String
    billing: BillingInput
    shipping: ShippingInput
  }
`
