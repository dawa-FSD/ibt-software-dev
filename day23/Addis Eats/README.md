Addis Eats

A responsive Ethiopian food-ordering frontend project built with semantic HTML5, CSS Grid/Flexbox, local JSON data, Fetch API, state-driven rendering, event delegation, localStorage, search/filtering, cart management and validated TeleBirr checkout.

Run locally

Because the app loads data/menu.json with fetch(), use a local server.

python -m http.server 8000

Open:

http://localhost:8000

Project structure

addis-eats/
├── index.html
├── styles.css
├── app.js
├── README.md
├── data/
│ └── menu.json
└── images/
├── doro-wat.svg
├── shiro.svg
├── tibs.svg
├── beyaynetu.svg
├── firfir.svg
├── chechebsa.svg
├── sambusa.svg
├── buna.svg
├── tej.svg
└── kitfo.svg

Requirements covered

Semantic HTML5

Responsive mobile-first layout

CSS Grid and Flexbox

Local JSON + fetch()

State object + render() flow

Search and category filters

Dynamic menu rendering

Event delegation

Add/remove/update cart quantities

Live ETB subtotal, delivery and total

Cart persistence using localStorage

Loading, error and empty states

Delivery-area selector

Accessible labels, live regions, skip link and image alt text

Validated Ethiopian TeleBirr phone number

Checkout modal and order confirmation
