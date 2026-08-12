const {
  subtotal,
  discountBy,
  withVat,
  toETB,
  makeReceiptMaker,
} = require("./order");
const memberDiscount = discountBy(0.1);
const makeReceipt = makeReceiptMaker();
let order1 = subtotal(100, 150, 200);
order1 = memberDiscount(order1);
order1 = withVat(order1);
console.log(makeReceipt(order1));
let order2 = subtotal(80, 120);
order2 = withVat(order2);
console.log(makeReceipt(order2));
