// Day 17 - Function Forms, Arrow Functions and Pure Functions

// Function Declaration
function vat(amount, rate = 0.15) {
  return amount * rate;
}
const vatExpression = function (amount, rate = 0.15) {
  return amount * rate;
};
const vatArrow = (amount, rate = 0.15) => amount * rate;
function discount(price, rate) {
  return price * (1 - rate);
}
console.log("VAT:", vat(1000));
console.log("VAT Expression:", vatExpression(1000));
console.log("VAT Arrow:", vatArrow(1000));
console.log("Discount:", discount(1000, 0.1));
