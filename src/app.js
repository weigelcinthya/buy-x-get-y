const express = require("express");
const app = express();
const ShoppingCartController = require("./shopping-cart/controller");

app.use(express.json());

app.get("/status", (req, res) => {
  res.json({
    status: "Running",
    timestamp: new Date().toISOString(),
  });
});

app.post("/shopping-cart", ShoppingCartController.shoppingCart);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
