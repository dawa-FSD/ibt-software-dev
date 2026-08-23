const prices = [250, 600, 180, 900];

const total = prices
  .map((price) => price * 1.15)
  .filter((price) => price < 1000)
  .reduce((sum, price) => sum + price, 0);

console.log(total);
