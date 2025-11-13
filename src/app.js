const express = require("express");
const app = express();
const cartRouter = require("./shopping-cart/routes");

app.use(express.json());

app.get("/status", (req, res) => {
  res.json({
    status: "Running",
    timestamp: new Date().toISOString(),
  });
});

app.use("/api/v1/shopping-cart", cartRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
