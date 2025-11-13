const express = require("express");
const router = express.Router();
const cartController = require("./controller");

router.post("/", cartController.getShoppingCart);

module.exports = router;
