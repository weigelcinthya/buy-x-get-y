# buy-x-get-y

An API to apply special discounts built with Node and Express.js

## Requirements

- Node 20.17.0
- Npm 10.8.2

## Getting started

- Install dependencies

```
npm install

```

- Start the server

```
npm run start

```

## Testing the application

- You'll need [Postman](https://www.postman.com/) or another HTTP Client
- The endpoint will be available in this path: http://localhost:3000/api/v1/shopping-cart
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

- Another option to test the aplication is to run a 'curl' command, like the example below:

```
curl --location 'http://localhost:3000/shopping-cart' \
--header 'Content-Type: application/json' \
--data '{
  "cart": {
    "reference": "2d832fe0-6c96-4515-9be7-4c00983539c1",
    "lineItems": [
      { "name": "Peanut Butter", "price": "39.0", "sku": "PEANUT-BUTTER" },
      { "name": "Fruity", "price": "34.99", "sku": "FRUITY" },
      { "name": "Chocolate", "price": "36", "sku": "CHOCOLATE" },
      { "name": "Banana Cake", "price": "32", "sku": "BANANA-CAKE" }
    ]
  }
}'

```

## Commands available

| Command          | Description                      |
| ---------------- | -------------------------------- |
| npm run start    | Start the server                 |
| npm run dev      | Start the server with watch mode |
| npm run lint     | Check for lintin errors          |
| npm run lint:fix | Fix linting errors               |
| npm run format   | Format code                      |
| npm run test     | Run tests                        |
