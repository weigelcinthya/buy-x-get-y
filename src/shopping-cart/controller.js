const ShoppingCartService = require("./service");

exports.getShoppingCart = (req, res) => {
  // PRO: Good practice - validates request body before processing
  // PRO: Proper use of early return pattern for error handling
  if (!req.body || Object.keys(req.body).length === 0) {
    res.status(400).json({ error: "Request body cannot be empty" });
    return;
  }

  // CON: Missing validation - if req.body.cart is undefined, this will crash
  // Test case: {"cart": {}} causes TypeError: Cannot read properties of undefined (reading 'length')
  // Should validate: if (!req.body.cart || !req.body.cart.lineItems) { return error }
  const { reference, lineItems } = req.body.cart;

  // CON: Missing return statement - code continues to execute even when returning 400
  // This means the function will still try to process the cart and return 200
  if (lineItems.length === 0) {
    res.status(400).json({ message: "There's no items in the cart." });
    // return; - Missing return statement
  }

  // PRO: Good separation of concerns - delegates business logic to service layer
  // PRO: Proper use of try-catch for error handling
  try {
    const processedData = ShoppingCartService.getShoppingCart(
      reference,
      lineItems,
    );

    res.status(200).json(processedData);
  } catch (error) {
    // CON: Error handling is too generic - exposes internal error details to client
    res.status(500).json(error);
  }
};
