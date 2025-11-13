const ShoppingCartService = require("./service");

test("expects special discount to not be applied when there´s no prerequisite skus in cart list", () => {
  const reference = "2d832fe0-6c96-4515-9be7-4c00983539c1";
  const lineItems = [
    { name: "Banana Cake", price: "32", sku: "BANANA-CAKE" },
    { name: "Chocolate", price: "32", sku: "CHOCOLATE" },
  ];

  const expectedCart = {
    cart: {
      reference: "2d832fe0-6c96-4515-9be7-4c00983539c1",
      lineItems: [
        {
          name: "Banana Cake",
          price: "32",
          sku: "BANANA-CAKE",
        },
        {
          name: "Chocolate",
          price: "32",
          sku: "CHOCOLATE",
        },
      ],
      final_cart_cost: "$64.00",
    },
  };

  expect(
    ShoppingCartService.getShoppingCart(reference, lineItems),
  ).toStrictEqual(expectedCart);
});

test("expects special discount to be applied when theres at least one prerequisite sku and one eligible item", () => {
  const reference = "2d832fe0-6c96-4515-9be7-4c00983539c1";
  const lineItems = [
    { name: "Peanut Butter", price: "39.0", sku: "PEANUT-BUTTER" },
    { name: "Fruity", price: "34.99", sku: "FRUITY" },
    { name: "Chocolate", price: "32", sku: "CHOCOLATE" },
  ];

  const expectedCart = {
    cart: {
      reference: "2d832fe0-6c96-4515-9be7-4c00983539c1",
      lineItems: [
        {
          name: "Peanut Butter",
          price: "39.0",
          sku: "PEANUT-BUTTER",
        },
        {
          name: "Fruity",
          price: "34.99",
          sku: "FRUITY",
        },
        {
          name: "Chocolate",
          price: 16,
          sku: "CHOCOLATE",
        },
      ],
      final_cart_cost: "$89.99",
    },
  };

  expect(
    ShoppingCartService.getShoppingCart(reference, lineItems),
  ).toStrictEqual(expectedCart);
});

test("expects special discount to be applied in the eligible item with the cheapest price", () => {
  const reference = "2d832fe0-6c96-4515-9be7-4c00983539c1";
  const lineItems = [
    { name: "Peanut Butter", price: "39.0", sku: "PEANUT-BUTTER" },
    { name: "Fruity", price: "34.99", sku: "FRUITY" },
    { name: "Chocolate", price: "36", sku: "CHOCOLATE" },
    { name: "Banana Cake", price: "32", sku: "BANANA-CAKE" },
  ];

  const expectedCart = {
    cart: {
      reference: "2d832fe0-6c96-4515-9be7-4c00983539c1",
      lineItems: [
        {
          name: "Peanut Butter",
          price: "39.0",
          sku: "PEANUT-BUTTER",
        },
        {
          name: "Fruity",
          price: "34.99",
          sku: "FRUITY",
        },
        {
          name: "Chocolate",
          price: "36",
          sku: "CHOCOLATE",
        },
        {
          name: "Banana Cake",
          price: 16,
          sku: "BANANA-CAKE",
        },
      ],
      final_cart_cost: "$125.99",
    },
  };

  expect(
    ShoppingCartService.getShoppingCart(reference, lineItems),
  ).toStrictEqual(expectedCart);
});
