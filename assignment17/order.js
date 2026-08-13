const VAT_RATE = 0.15;
const MEMBER_DISCOUNT = 0.1;

// Pure function
const subtotal = (...prices) =>
  prices.reduce((total, price) => total + price, 0);

// Factory returning an arrow function
const discountBy = (rate) => (amount) => amount * rate;

// Pure helper
const withVat = (amount) => amount + amount * VAT_RATE;

// Pure helper
const toETB = (amount) => " ${amount.toFixed(2)} ETB";

// Closure with private order number
const makeReceiptMaker = () => {
  let orderNumber = 1;

  return (...prices) => {
    const sub = subtotal(...prices);
    const discount = discountBy(MEMBER_DISCOUNT)(sub);
    const afterDiscount = sub - discount;
    const total = withVat(afterDiscount);

    return "#${orderNumber++}: ${toETB(total)}";
  };
};

module.exports = {
  subtotal,
  discountBy,
  withVat,
  toETB,
  makeReceiptMaker,
};
