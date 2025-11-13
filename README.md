# buy-x-get-y

An API to apply special discounts built with Node and Express.js

# Getting started

- Install [npm](https://www.npmjs.com/)
- Run `npm install` in the project folder
- Run `npm run dev` to start the server

# Testing the application

- You'll need [Postman](https://www.postman.com/) or another similar application to send requests
- The server will be available in the http://localhost:3000/ and you can test the shopping cart endpoint with this path: /shopping-cart
- The request is of type 'POST' and the body should follow the example below:

```json
{
  "cart": {
    "reference": "2d832fe0-6c96-4515-9be7-4c00983539c1",
    "lineItems": [
      { "name": "Peanut Butter", "price": "39.0", "sku": "PEANUT-BUTTER" },
      { "name": "Fruity", "price": "34.99", "sku": "FRUITY" },
      { "name": "Chocolate", "price": "36", "sku": "CHOCOLATE" },
      { "name": "Banana Cake", "price": "32", "sku": "BANANA-CAKE" }
    ]
  }
}
```
