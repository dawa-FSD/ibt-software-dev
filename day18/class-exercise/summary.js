import { withVat, format, total } from "./pricing.js";
import { orders } from "./orders.js";
const ordersWithTotal = orders.map((order) => ({
  ...order,
  total: withVat(total(order.items)),
}));
const expensiveOrders = ordersWithTotal.filter(({ total }) => total > 500);
const grandTotal = ordersWithTotal.reduce((sum, { total }) => sum + total, 0);
console.log("=== ADDIS MARKET ORDER SUMMARY ===");
ordersWithTotal.forEach(({ id, customer, total }) => {
  console.log(`Order #${id} | ${customer} | ${format(total)}`);
});
console.log("\nOrders over 500 ETB:");
expensiveOrders.forEach(({ id, customer, total }) => {
  console.log(`Order #${id} | ${customer} | ${format(total)}`);
});
console.log(`\nGrand Total: ${format(grandTotal)}`);
