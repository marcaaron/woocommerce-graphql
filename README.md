# WooCommerce API -> GraphQL Node Server

*Work in Progress!*

### What is This?

A Node JS project that transforms your WooCommerce REST API into a simple GraphQL endpoint via Apollo Server 2.0.

### What Will I Be Able Do With It?

Create a 100% headless WooCommerce site with the front end of your choice. Since it serves a GraphQL endpoint it should be easy to integrate with static site generators like Gatsby while having some dynamic elements left up to something like Apollo Client. GraphQL will serve the bare minimum of data needed to the client. Which is useful for the WC API since it returns fairly large data objects.

### Mutations
- Create a new Order
- Create a new Customer Account
- Authorize a Customer with JWT
- Make Authenticated Requests for Order creation, cancellation, customer information updates etc.

### Queries
- Fetch Product data (e.g. stock quantities, date-time dependent product features, etc)
- Fetch Product Reviews
- Fetch a Product and it's Reviews at the same time!
- Sure, why not?

### What Doesn't It Do?
It's basically just a data layer meaning it won't handle payments for you or build out your front-end. That implementation is up to you. But I am looking to add Stripe integration soon.

### Next Steps

I'd like to create some hooks for subscriptions. I think it would be very cool if things like stock quantity were subscription based vs. query based. The resolver functions I have written so far are not exhaustive. Open to PRs if anyone is interested in improving the project or adding more types, resolvers, etc.

## To Do
Add Getting Started Guide
