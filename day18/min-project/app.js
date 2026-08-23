import { transactions } from "./transactions.js";
import { totalByType, receipts } from "./report.js";
console.log(`Debits: ${totalByType(transactions, "debit")} ETB`);
console.log(`Credits: ${totalByType(transactions, "credit")} ETB`);
console.log(receipts(transactions));
const updated = {
  ...transactions[0],
  amount: 300,
};
console.log(updated);
console.log(transactions[0]);
