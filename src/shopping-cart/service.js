const schema = require("../../assets/schema.json");

const getShoppingCart = (reference, lineItems) => {
  // CON: Missing input validation - should validate lineItems is an array
  // CON: Missing null/undefined checks for reference and lineItems
  // PRO: Good use of descriptive variable names (prerequisiteSkusList, eligibleSkusList)
  const prerequisiteSkusList = lineItems.filter((item) =>
    schema.prerequisite_skus.includes(item.sku),
  );
  const eligibleSkusList = lineItems.filter((item) =>
    schema.eligible_skus.includes(item.sku),
  );

  // CON: Logic issue - doesn't handle case where same item is both prerequisite AND eligible
  // Example: Single COCOA item (both prerequisite and eligible) incorrectly gets discount applied
  // This violates "Buy X Get Y" - you need to buy X to get Y discounted, not buy X to get X discounted
  // Should ensure prerequisite and eligible items are different items
  const isDiscountEligible =
    prerequisiteSkusList.length && eligibleSkusList.length;
  if (isDiscountEligible) {
    applyDiscount(eligibleSkusList);
  }

  // PRO: Good separation - calculation logic extracted to separate function
  const totalCartValue = calculateCartTotal(lineItems);

  // PRO: Clean return structure that matches expected API response format
  // PRO: Proper formatting of currency with toFixed(2) for consistent decimal places
  return {
    cart: {
      reference: reference,
      lineItems: lineItems,
      final_cart_cost: `$${totalCartValue.toFixed(2)}`,
    },
  };
};

const applyDiscount = (eligibleSkusList) => {
  // CON: Need to validate if the cart has at least 2 items to apply the discount, otherwise
  // for a single item that is both prerequisite and eligible, the discount will be applied to the same item.
  // And since this is a Buy X Get Y discount, it should be applied to the other item.
  const sortedEligibleSkus = eligibleSkusList.sort((a, b) => {
    return Number(a.price) - Number(b.price);
  });
  const itemToDiscount = sortedEligibleSkus[0];
  
  // CON: Missing validation - what if discount_value is not a valid number?
  const percentage = schema.discount_value / 100;
  const priceWithDiscount =
    Number(itemToDiscount.price) - Number(itemToDiscount.price) * percentage;
  
  // CON: Mutating the original object - should return a new object or at least preserve original price
  // CON: Type inconsistency - price changes from string to number, which could break downstream code
  // CON: Should round to 2 decimal places to avoid floating point precision issues
  itemToDiscount.price = priceWithDiscount;
};

// PRO: Clean, functional approach using reduce - idiomatic JavaScript
const calculateCartTotal = (items) => {
  return items.reduce((sum, currentItem) => {
    return sum + Number(currentItem.price);
  }, 0);
};

module.exports = { getShoppingCart };
