const ShoppingCartService = require("./service");

exports.shoppingCart = (req, res) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    res.status(400).json({ error: "Request body cannot be empty" });
    return;
  }

  const { reference, lineItems } = req.body?.cart;

  if (lineItems.length === 0) {
    res.status(400).json({ message: "There's no items in the cart." });
  }

  const processedData = ShoppingCartService.applySpecialDiscount(
    reference,
    lineItems,
  );

  res.status(200).json(processedData);
};
