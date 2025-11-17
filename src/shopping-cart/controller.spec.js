const ShoppingCartController = require("./controller");

// PRO: Integration test - tests the entire controller flow
describe("POST Request", () => {
  it("return 200 status if cart has items", () => {
    const req = {
      body: {
        cart: {
          reference: "2d832fe0-6c96-4515-9be7-4c00983539c1",
          lineItems: [
            { name: "Peanut Butter", price: "39.0", sku: "PEANUT-BUTTER" },
            { name: "Fruity", price: "34.99", sku: "FRUITY" },
            { name: "Chocolate", price: "32", sku: "CHOCOLATE" },
          ],
        },
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    ShoppingCartController.getShoppingCart(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
  });

  it("return 400 status if cart doesnt have items", () => {
    const req = {
      body: {
        cart: {
          reference: "2d832fe0-6c96-4515-9be7-4c00983539c1",
          lineItems: [],
        },
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    ShoppingCartController.getShoppingCart(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("return 400 status if request body is empty", () => {
    const req = { body: {} };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    ShoppingCartController.getShoppingCart(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
  });
});
