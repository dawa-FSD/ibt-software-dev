// money.js

export const VAT = 0.15;
export const addVat = (amount) => amount * (1 + VAT);

// app.js
import { addVat, VAT } from "./money.js";
console.log(VAT);
console.log(addVat(1000));
