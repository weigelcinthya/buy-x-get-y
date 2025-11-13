const schema = require("../assets/schema.json");

exports.shoppingCart = (req, res) => {
  const bodyData = req.body;
  const cart = bodyData.cart;

  if(cart.lineItems.length === 0) {
    res.status(200).json(req.body)
  }

  const prerequisiteSkusList = cart?.lineItems.filter((item) =>
    schema.prerequisite_skus.includes(item.sku),
  );
  const eligibleSkusList = cart?.lineItems.filter((item) =>
    schema.eligible_skus.includes(item.sku),
  );

  let totalCartValue = 0;

  const isDiscountEligible = prerequisiteSkusList.length && eligibleSkusList.length;
  if(isDiscountEligible) {
    applyDiscount(eligibleSkusList);
  }

  totalCartValue = calculateCartTotal(cart.lineItems);

  const processedData = {
    cart: {
      reference: bodyData.cart.reference,
      lineItems: cart.lineItems,
      final_cart_cost: `$${totalCartValue.toFixed(2)}`,
    },
  };

  res.status(200).json(processedData);
};

const applyDiscount = (eligibleSkusList) => {
  let sortedEligibleSkus = eligibleSkusList.sort((a, b) => {
    return Number(a.price) - Number(b.price);
  });
  let itemToDiscount = sortedEligibleSkus[0];
  const percentage = schema.discount_value / 100;
  let priceWithDiscount =
    Number(itemToDiscount.price) - Number(itemToDiscount.price) * percentage;
  itemToDiscount.price = priceWithDiscount;
};

const calculateCartTotal = (items) => {
  return items.reduce((sum, currentItem) => {
    return sum + Number(currentItem.price);
  }, 0);
};
