function createLoyaltyPoints(earnRule) {
  let points = 0;

  function earn(amount) {
    points += earnRule(amount);
  }

  function redeem(amount) {
    if (amount <= points) {
      points -= amount;
      return true;
    }

    return false;
  }

  function balance() {
    return points;
  }

  return {
    earn,
    redeem,
    balance,
  };
}

const normalRule = (amount) => Math.floor(amount / 10);

const holidayRule = (amount) => Math.floor(amount / 10) * 2;

const customer = createLoyaltyPoints(normalRule);

customer.earn(100);
console.log(customer.balance());

customer.earn(250);
console.log(customer.balance());

customer.redeem(10);
console.log(customer.balance());

console.log(customer.redeem(100));
console.log(customer.balance());

const holidayCustomer = createLoyaltyPoints(holidayRule);
holidayCustomer.earn(100);
console.log(holidayCustomer.balance());
