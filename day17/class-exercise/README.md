# Habesha Eatery Order Module

A small JavaScript order module for calculating restaurant orders in ETB.

## Requirements

The module should include:

- `subtotal(...prices)` using a `reduce()` callback
- `discountBy(rate)` as a factory function returning an arrow function
- `withVat(amount)` as a pure helper
- `toETB(amount)` as a pure helper
- `makeReceiptMaker()` using a closure with a private order number- `run.js` to create and print receipts

## Functions

### subtotal(...prices)

Adds all prices together using `reduce()`.
Example:

```js
subtotal(100, 150, 200);
```
