const bill = Number(process.argv[2]);
const partySize = Number(process.argv[3]);
const paymentMethod = process.argv[4];

let tipRate;

if (bill > 300) {
  tipRate = 0.10;
} else {
  tipRate = 0.05;
}

const tip = bill * tipRate;
const subtotal = bill + tip;

let serviceFee;

switch (paymentMethod) {
  case "TeleBirr":
    serviceFee = 5;
    break;
  case "CBE Birr":
    serviceFee = 3;
    break;
  default:
    serviceFee = 0;
}

const total = subtotal + serviceFee;
const perPerson = total / partySize;

console.log(Bill: ${bill.toFixed(2)} ETB);
console.log(Tip: ${tip.toFixed(2)} ETB);
console.log(Service fee: ${serviceFee.toFixed(2)} ETB);
console.log(Total: ${total.toFixed(2)} ETB);
console.log(Each person pays: ${perPerson.toFixed(2)} ETB);