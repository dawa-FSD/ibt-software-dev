# Addis Market Order Summary

## Overview

This project calculates Addis Market order totals using modern JavaScript array methods and ES modules.

## Files

* `pricing.js` - Contains pricing functions.
* `orders.js` - Contains sample order data.
* `summary.js` - Processes orders and prints the summary.

## Requirements

* Use ES module `export` and `import`.
* Use `reduce()` to calculate item totals.
* Use destructuring for order and item data.
* Use `map()` to add a total to each order.
* Use spread syntax to copy order objects.
* Use `filter()` to find orders over 500 ETB.
* Use `reduce()` to calculate the grand total.
* Add 15% VAT.
* Format amounts in ETB.

## How to Run

Make sure `package.json` contains:

```json
{
  "type": "module"
}
```

Then run:

```bash
node summary.js
```

## Expected Output

```text
=== ADDIS MARKET ORDER SUMMARY ===
Order #1 | Dawa | 977.50 ETB
Order #2 | Almaz | 241.50 ETB
Order #3 | Abebe | 920.00 ETB

Orders over 500 ETB:
Order #1 | Dawa | 977.50 ETB
Order #3 | Abebe | 920.00 ETB

Grand Total: 2139.00 ETB
```

## Self-Check

* [ ] `withVat` is exported from `pricing.js`
* [ ] `format` is exported from `pricing.js`
* [ ] `total` is exported from `pricing.js`
* [ ] Functions are imported into `summary.js`
* [ ] `reduce()` calculates item totals
* [ ] Destructuring is used
* [ ] `map()` adds the total field
* [ ] Spread syntax is used
* [ ] `filter()` finds orders above 500 ETB
* [ ] Grand total is calculated
* [ ] Output is formatted in ETB
