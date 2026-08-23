const customer = {
  name: "Dawa",
  city: "Addis Ababa",
};

const { name, city } = customer;

function greet({ name }) {
  return `Selam ${name}`;
}

console.log(greet(customer));
