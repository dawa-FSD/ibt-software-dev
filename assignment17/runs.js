const { makeReceiptMaker } = require("./order");

const makeReceipt = makeReceiptMaker();

console.log(makeReceipt(100, 50));
console.log(makeReceipt(200, 80));
console.log(makeReceipt(300, 100));
