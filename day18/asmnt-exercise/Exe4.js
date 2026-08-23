const customer = {
  name: "Dawa",
  city: "Addis Ababa",
  balance: 1500,
};

const updatedCustomer = {
  ...customer,
  city: "Adama",
  phone: "0911000000",
};

console.log(updatedCustomer);
console.log(customer);
