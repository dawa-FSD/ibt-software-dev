function myForEach(list, callback) {
  let index = 0;
  for (const item of list) {
    callback(item, index);
    index++;
  }
}
const cities = ["Addis Ababa", "Adama", "Jimma", "Bahir Dar"];
myForEach(cities, (city, index) => {
  console.log(`${index + 1}. ${city}`);
});
function myMap(list, callback) {
  const results = [];
  for (const item of list) {
    results.push(callback(item));
  }
  return results;
}
const prices = [100, 200, 300];
const pricesWithVat = myMap(prices, (price) => price * 1.15);
console.log(pricesWithVat);
function applyToAll(list, fn) {
  const results = [];
  for (const item of list) {
    results.push(fn(item));
  }
  return results;
}
const addVat = (price) => price * 1.15;
const finalPrices = applyToAll([100, 200, 300, 400], addVat);
console.log(finalPrices);
function discountBy(rate) {
  return (price) => price * (1 - rate);
}
const memberPrice = discountBy(0.1);
const salePrice = discountBy(0.3);
console.log(memberPrice(1000));
console.log(salePrice(1000));
