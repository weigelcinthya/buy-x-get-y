// PRO: Clean application structure with proper middleware setup
// PRO: Good practice - uses express.json() middleware for parsing JSON bodies
const express = require("express");
const app = express();
const cartRouter = require("./shopping-cart/routes");

app.use(express.json());

// PRO: Nice addition - health check endpoint for monitoring/debugging
app.get("/status", (req, res) => {
  res.json({
    status: "Running",
    timestamp: new Date().toISOString(),
  });
});

// PRO: RESTful API versioning (v1) - shows forward-thinking design
// PRO: Clear, semantic route path (/api/v1/shopping-cart)
app.use("/api/v1/shopping-cart", cartRouter);

// PRO: Good practice - uses environment variable with fallback for port configuration
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
