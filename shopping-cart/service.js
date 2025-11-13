const schema = require("../assets/schema.json");

const applySpecialDiscount = (reference, lineItems) => {
  const prerequisiteSkusList = lineItems.filter((item) =>
    schema.prerequisite_skus.includes(item.sku),
  );
  const eligibleSkusList = lineItems.filter((item) =>
    schema.eligible_skus.includes(item.sku),
  );

  let totalCartValue = 0;

  const isDiscountEligible =
    prerequisiteSkusList.length && eligibleSkusList.length;
  if (isDiscountEligible) {
    applyDiscount(eligibleSkusList);
  }

  totalCartValue = calculateCartTotal(lineItems);

  return {
    cart: {
      reference: reference,
      lineItems: lineItems,
      final_cart_cost: `$${totalCartValue.toFixed(2)}`,
    },
  };
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

module.exports = { applySpecialDiscount };
