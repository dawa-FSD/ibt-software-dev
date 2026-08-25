/* =========================================================
   ADDIS EATS
   State → Render → Event → State Change → Render
========================================================= */

"use strict";

/* =========================================================
   CONFIG
========================================================= */

const MENU_URL = "./data/menu.json";
const CART_STORAGE_KEY = "addisEatsCart";

/*
  Delivery fee by area.
*/
const DELIVERY_FEES = {
  Bole: 50,
  Kazanchis: 60,
  Piassa: 70,
  CMC: 80,
  Megenagna: 75,
  "4 Kilo": 65,
};

/* =========================================================
   DOM REFERENCES
========================================================= */

const menuElement = document.getElementById("menu");

const searchElement = document.getElementById("search");

const categoryFilterElement = document.getElementById("categoryFilter");

const spicyFilterElement = document.getElementById("spicyFilter");

const statusMessageElement = document.getElementById("statusMessage");

const resultsCountElement = document.getElementById("resultsCount");

const cartElement = document.getElementById("cart");

const cartItemsElement = document.getElementById("cartItems");

const cartEmptyElement = document.getElementById("cartEmpty");

const cartSummaryElement = document.getElementById("cartSummary");

const checkoutSectionElement = document.getElementById("checkoutSection");

const cartCountElement = document.getElementById("cartCount");

const cartHeaderCountElement = document.getElementById("cartHeaderCount");

const subtotalElement = document.getElementById("subtotal");

const deliveryFeeElement = document.getElementById("deliveryFee");

const grandTotalElement = document.getElementById("grandTotal");

const cartToggleElement = document.getElementById("cartToggle");

const cartCloseElement = document.getElementById("cartClose");

const cartOverlayElement = document.getElementById("cartOverlay");

const toastElement = document.getElementById("toast");

const checkoutFormElement = document.getElementById("checkoutForm");

const customerNameElement = document.getElementById("customerName");

const phoneElement = document.getElementById("phone");

const deliveryAreaElement = document.getElementById("deliveryArea");

const addressElement = document.getElementById("address");

/* =========================================================
   STATE
========================================================= */

const state = {
  dishes: [],

  filteredDishes: [],

  cart: loadCart(),

  search: "",

  category: "all",

  spicy: "all",

  loading: true,

  error: null,

  deliveryArea: "",
};

/* =========================================================
   INIT
========================================================= */

document.addEventListener("DOMContentLoaded", init);

async function init() {
  setupEvents();

  await loadMenu();

  renderCart();
}

/* =========================================================
   EVENTS
========================================================= */

function setupEvents() {
  searchElement.addEventListener("input", handleSearch);

  categoryFilterElement.addEventListener("change", handleCategoryChange);

  spicyFilterElement.addEventListener("change", handleSpicyChange);

  /*
    Event delegation for dynamically
    created menu buttons.
  */
  menuElement.addEventListener("click", handleMenuClick);

  /*
    Event delegation for dynamically
    created cart controls.
  */
  cartItemsElement.addEventListener("click", handleCartClick);

  cartToggleElement.addEventListener("click", openCart);

  cartCloseElement.addEventListener("click", closeCart);

  cartOverlayElement.addEventListener("click", closeCart);

  deliveryAreaElement.addEventListener("change", handleDeliveryAreaChange);

  checkoutFormElement.addEventListener("submit", handleCheckout);
}

/* =========================================================
   LOAD MENU
========================================================= */

async function loadMenu() {
  state.loading = true;
  state.error = null;

  renderMenu();

  try {
    const response = await fetch(MENU_URL);

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const data = await response.json();

    if (!Array.isArray(data)) {
      throw new Error("Menu data must be an array.");
    }

    state.dishes = data;

    buildCategoryFilter();

    state.loading = false;

    applyFilters();
  } catch (error) {
    console.error("Failed to load menu:", error);

    state.error = "We couldn't load the menu.";

    state.loading = false;

    renderMenu();
  }
}

/* =========================================================
   CATEGORY FILTER
========================================================= */

function buildCategoryFilter() {
  const categories = [
    ...new Set(state.dishes.map((dish) => dish.category)),
  ].sort();

  categoryFilterElement.innerHTML = `
    <option value="all">
      All dishes
    </option>

    ${categories
      .map(
        (category) => `
          <option value="${escapeHtml(category)}">
            ${escapeHtml(category)}
          </option>
        `,
      )
      .join("")}
  `;

  categoryFilterElement.value = state.category;
}

/* =========================================================
   SEARCH
========================================================= */

function handleSearch(event) {
  state.search = event.target.value.trim().toLowerCase();

  applyFilters();
}

/* =========================================================
   CATEGORY CHANGE
========================================================= */

function handleCategoryChange(event) {
  state.category = event.target.value;

  applyFilters();
}

/* =========================================================
   SPICY CHANGE
========================================================= */

function handleSpicyChange(event) {
  state.spicy = event.target.value;

  applyFilters();
}

/* =========================================================
   DELIVERY AREA
========================================================= */

function handleDeliveryAreaChange(event) {
  state.deliveryArea = event.target.value;

  renderCart();
}

/* =========================================================
   FILTER
========================================================= */

function applyFilters() {
  const filtered = state.dishes.filter((dish) => {
    const matchesSearch =
      dish.name.toLowerCase().includes(state.search) ||
      dish.description.toLowerCase().includes(state.search);

    const matchesCategory =
      state.category === "all" || dish.category === state.category;

    const matchesSpicy =
      state.spicy === "all" ||
      (state.spicy === "spicy" && dish.spicy === true) ||
      (state.spicy === "mild" && dish.spicy === false);

    return matchesSearch && matchesCategory && matchesSpicy;
  });

  state.filteredDishes = filtered;

  renderMenu();
}

/* =========================================================
   MENU RENDER
========================================================= */

function renderMenu() {
  /* Loading */
  if (state.loading) {
    statusMessageElement.textContent = "Loading menu...";

    resultsCountElement.textContent = "Loading...";

    menuElement.innerHTML = `
      ${createLoadingCard()}
      ${createLoadingCard()}
      ${createLoadingCard()}
      ${createLoadingCard()}
    `;

    return;
  }

  /* Error */
  if (state.error) {
    statusMessageElement.innerHTML = `
      <span>
        ${escapeHtml(state.error)}
      </span>

      <button
        type="button"
        class="retry-button"
        id="retryButton"
      >
        Try again
      </button>
    `;

    resultsCountElement.textContent = "Menu unavailable";

    menuElement.innerHTML = `
      <div class="empty-state">

        <div class="empty-state-icon">
          ⚠️
        </div>

        <h3>
          Something went wrong
        </h3>

        <p>
          Please try loading the
          menu again.
        </p>

      </div>
    `;

    const retryButton = document.getElementById("retryButton");

    retryButton?.addEventListener("click", loadMenu);

    return;
  }

  /* Status */
  statusMessageElement.textContent =
    state.filteredDishes.length === 0
      ? "No matching dishes found."
      : "Showing delicious dishes.";

  /* Result count */
  resultsCountElement.textContent = `${state.filteredDishes.length} dish${
    state.filteredDishes.length === 1 ? "" : "es"
  }`;

  /* Empty */
  if (state.filteredDishes.length === 0) {
    menuElement.innerHTML = `
      <div class="empty-state">

        <div class="empty-state-icon">
          🍽️
        </div>

        <h3>
          No dishes found
        </h3>

        <p>
          Try a different search
          or category.
        </p>

      </div>
    `;

    return;
  }

  /* Render */
  menuElement.innerHTML = state.filteredDishes
    .map((dish) => createDishCard(dish))
    .join("");
}

/* =========================================================
   LOADING CARD
========================================================= */

function createLoadingCard() {
  return `
    <article
      class="dish"
      aria-hidden="true"
    >

      <div
        style="
          aspect-ratio: 4 / 3;
          background: #eef2f7;
        "
      ></div>

      <div class="dish-content">

        <div
          style="
            width: 35%;
            height: 12px;
            background: #eef2f7;
            border-radius: 6px;
          "
        ></div>

        <div
          style="
            width: 75%;
            height: 22px;
            margin-top: 12px;
            background: #eef2f7;
            border-radius: 6px;
          "
        ></div>

        <div
          style="
            width: 100%;
            height: 35px;
            margin-top: 12px;
            background: #eef2f7;
            border-radius: 6px;
          "
        ></div>

        <div
          style="
            width: 50%;
            height: 18px;
            margin-top: 15px;
            background: #eef2f7;
            border-radius: 6px;
          "
        ></div>

      </div>

    </article>
  `;
}

/* =========================================================
   DISH CARD
========================================================= */

function createDishCard(dish) {
  const spicyBadge = dish.spicy
    ? `
        <span
          class="badge badge-spicy"
        >
          🌶️ Spicy
        </span>
      `
    : "";

  const vegetarianBadge = dish.vegetarian
    ? `
        <span
          class="badge badge-vegetarian"
        >
          🌱 Vegetarian
        </span>
      `
    : "";

  return `
    <article
      class="dish"
      data-dish-id="${dish.id}"
    >

      <div class="dish-image-wrapper">

        <img
          class="dish-image"
          src="${escapeHtml(dish.image)}"
          alt="${escapeHtml(dish.name)}"
          loading="lazy"
          onerror="
            this.src='https://placehold.co/600x450?text=Addis+Eats'
          "
        >

        <div class="dish-badges">

          ${spicyBadge}

          ${vegetarianBadge}

        </div>

      </div>

      <div class="dish-content">

        <span class="dish-category">
          ${escapeHtml(dish.category)}
        </span>

        <h3>
          ${escapeHtml(dish.name)}
        </h3>

        <p class="dish-description">
          ${escapeHtml(dish.description)}
        </p>

        <div class="dish-bottom">

          <strong class="price">
            ETB ${formatMoney(dish.price)}
          </strong>

          <button
            type="button"
            class="add-button"
            data-action="add"
            data-id="${dish.id}"
            aria-label="Add ${escapeHtml(dish.name)} to cart"
          >
            Add to Cart
          </button>

        </div>

      </div>

    </article>
  `;
}

/* =========================================================
   MENU CLICK
========================================================= */

function handleMenuClick(event) {
  const button = event.target.closest("[data-action='add']");

  if (!button) return;

  const dishId = Number(button.dataset.id);

  addToCart(dishId);
}

/* =========================================================
   ADD TO CART
========================================================= */

function addToCart(dishId) {
  const dish = state.dishes.find((item) => item.id === dishId);

  if (!dish) {
    console.error("Dish not found:", dishId);
    return;
  }

  const existing = state.cart.find((item) => item.id === dishId);

  if (existing) {
    existing.quantity += 1;
  } else {
    state.cart.push({
      id: dish.id,
      quantity: 1,
    });
  }

  saveCart();

  console.log("Cart saved:", state.cart);
  console.log("LocalStorage:", localStorage.getItem("addisEatsCart"));

  renderCart();

  showToast(`${dish.name} added to your cart.`);
}

/* =========================================================
   CART CLICK
========================================================= */

function handleCartClick(event) {
  const button = event.target.closest("[data-cart-action]");

  if (!button) return;

  const action = button.dataset.cartAction;

  const id = Number(button.dataset.id);

  if (action === "increase") {
    changeQuantity(id, 1);
  }

  if (action === "decrease") {
    changeQuantity(id, -1);
  }

  if (action === "remove") {
    removeFromCart(id);
  }
}

/* =========================================================
   CHANGE QUANTITY
========================================================= */

function changeQuantity(id, amount) {
  const item = state.cart.find((cartItem) => cartItem.id === id);

  if (!item) return;

  item.quantity += amount;

  if (item.quantity <= 0) {
    state.cart = state.cart.filter((cartItem) => cartItem.id !== id);
  }

  saveCart();

  renderCart();
}

/* =========================================================
   REMOVE FROM CART
========================================================= */

function removeFromCart(id) {
  const dish = state.dishes.find((item) => item.id === id);

  state.cart = state.cart.filter((item) => item.id !== id);

  saveCart();

  renderCart();

  if (dish) {
    showToast(`${dish.name} removed from your cart.`);
  }
}

/* =========================================================
   RENDER CART
========================================================= */

function renderCart() {
  const validCart = state.cart.filter((item) =>
    state.dishes.some((dish) => dish.id === item.id),
  );

  if (validCart.length !== state.cart.length) {
    state.cart = validCart;

    saveCart();
  }

  const cartData = state.cart
    .map((item) => {
      const dish = state.dishes.find((d) => d.id === item.id);

      if (!dish) {
        return null;
      }

      return {
        ...dish,
        quantity: item.quantity,
      };
    })
    .filter(Boolean);

  const itemCount = cartData.reduce((sum, item) => sum + item.quantity, 0);

  const subtotal = cartData.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const deliveryFee = state.deliveryArea
    ? DELIVERY_FEES[state.deliveryArea] || 0
    : 0;

  const total = subtotal + deliveryFee;

  cartCountElement.textContent = itemCount;

  cartHeaderCountElement.textContent = `(${itemCount})`;

  /* Empty cart */
  if (cartData.length === 0) {
    cartItemsElement.innerHTML = "";

    cartEmptyElement.classList.remove("hidden");

    cartSummaryElement.classList.add("hidden");

    checkoutSectionElement.classList.add("hidden");

    return;
  }

  /* Cart has items */
  cartEmptyElement.classList.add("hidden");

  cartSummaryElement.classList.remove("hidden");

  checkoutSectionElement.classList.remove("hidden");

  cartItemsElement.innerHTML = cartData
    .map((item) => createCartItem(item))
    .join("");

  subtotalElement.textContent = `ETB ${formatMoney(subtotal)}`;

  deliveryFeeElement.textContent = state.deliveryArea
    ? `ETB ${formatMoney(deliveryFee)}`
    : "Choose area";

  grandTotalElement.textContent = `ETB ${formatMoney(total)}`;
}

/* =========================================================
   CART ITEM
========================================================= */

function createCartItem(item) {
  return `
    <article class="cart-item">

      <img
        class="cart-item-image"
        src="${escapeHtml(item.image)}"
        alt="${escapeHtml(item.name)}"
        loading="lazy"
        onerror="
          this.src='https://placehold.co/120x120?text=Food'
        "
      >

      <div class="cart-item-main">

        <h3 class="cart-item-title">
          ${escapeHtml(item.name)}
        </h3>

        <p class="cart-item-price">
          ETB ${formatMoney(item.price)}
          × ${item.quantity}
        </p>

        <div class="cart-item-actions">

          <div
            class="qty-control"
            aria-label="Quantity controls"
          >

            <button
              type="button"
              class="qty-button"
              data-cart-action="decrease"
              data-id="${item.id}"
              aria-label="Decrease ${escapeHtml(item.name)} quantity"
            >
              −
            </button>

            <span
              class="qty-number"
              aria-live="polite"
            >
              ${item.quantity}
            </span>

            <button
              type="button"
              class="qty-button"
              data-cart-action="increase"
              data-id="${item.id}"
              aria-label="Increase ${escapeHtml(item.name)} quantity"
            >
              +
            </button>

          </div>

          <button
            type="button"
            class="remove-button"
            data-cart-action="remove"
            data-id="${item.id}"
          >
            Remove
          </button>

        </div>

      </div>

    </article>
  `;
}

/* =========================================================
   LOCAL STORAGE
========================================================= */

function saveCart() {
  try {
    const cartData = JSON.stringify(state.cart);

    localStorage.setItem("addisEatsCart", cartData);

    console.log("Saved to localStorage:", cartData);
  } catch (error) {
    console.error("Could not save cart:", error);
  }
}

function loadCart() {
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);

    if (!stored) {
      return [];
    }

    const parsed = JSON.parse(stored);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed
      .filter(
        (item) =>
          Number.isInteger(item.id) &&
          Number.isInteger(item.quantity) &&
          item.quantity > 0,
      )
      .map((item) => ({
        id: item.id,
        quantity: item.quantity,
      }));
  } catch (error) {
    console.error("Could not load cart:", error);

    return [];
  }
}

/* =========================================================
   CHECKOUT
========================================================= */

function handleCheckout(event) {
  event.preventDefault();

  clearValidationErrors();

  const name = customerNameElement.value.trim();

  const phone = phoneElement.value.trim();

  const area = deliveryAreaElement.value.trim();

  const address = addressElement.value.trim();

  let isValid = true;

  /* Name */
  if (name.length < 2) {
    showFieldError("customerName", "Please enter your full name.");

    isValid = false;
  }

  /* Ethiopian phone */
  const phonePattern = /^(09|07)\d{8}$/;

  if (!phonePattern.test(phone)) {
    showFieldError(
      "phone",
      "Use a valid Ethiopian phone number such as 0912345678.",
    );

    isValid = false;
  }

  /* Area */
  if (!area) {
    showFieldError("deliveryArea", "Please choose a delivery area.");

    isValid = false;
  }

  /* Address */
  if (address.length < 5) {
    showFieldError("address", "Please enter a valid delivery address.");

    isValid = false;
  }

  /* Cart */
  if (state.cart.length === 0) {
    showToast("Your cart is empty.");

    isValid = false;
  }

  if (!isValid) {
    return;
  }

  const orderTotal = calculateCartTotal();

  const orderId = `AE-${Date.now().toString().slice(-6)}`;

  showToast(
    `Order ${orderId} placed successfully. Total: ETB ${formatMoney(
      orderTotal,
    )}`,
  );

  /*
    Demo app:
    clear cart after successful checkout.
  */

  state.cart = [];

  saveCart();

  renderCart();

  checkoutFormElement.reset();

  state.deliveryArea = "";

  clearValidationErrors();
}

/* =========================================================
   CALCULATE TOTAL
========================================================= */

function calculateCartSubtotal() {
  return state.cart.reduce((total, cartItem) => {
    const dish = state.dishes.find((item) => item.id === cartItem.id);

    if (!dish) {
      return total;
    }

    return total + dish.price * cartItem.quantity;
  }, 0);
}

function calculateCartTotal() {
  const subtotal = calculateCartSubtotal();

  const deliveryFee = state.deliveryArea
    ? DELIVERY_FEES[state.deliveryArea] || 0
    : 0;

  return subtotal + deliveryFee;
}

/* =========================================================
   VALIDATION UI
========================================================= */

function showFieldError(field, message) {
  const errorElement = document.getElementById(`${field}Error`);

  if (errorElement) {
    errorElement.textContent = message;
  }

  const inputElement = document.getElementById(field);

  if (inputElement) {
    inputElement.setAttribute("aria-invalid", "true");

    inputElement.style.borderColor = "var(--danger)";
  }
}

function clearValidationErrors() {
  const errorIds = [
    "customerNameError",
    "phoneError",
    "deliveryAreaError",
    "addressError",
  ];

  errorIds.forEach((id) => {
    const element = document.getElementById(id);

    if (element) {
      element.textContent = "";
    }
  });

  [
    customerNameElement,
    phoneElement,
    deliveryAreaElement,
    addressElement,
  ].forEach((input) => {
    input.removeAttribute("aria-invalid");

    input.style.borderColor = "";
  });
}

/* =========================================================
   CART DRAWER
========================================================= */

function openCart() {
  cartElement.classList.add("open");

  document.body.classList.add("cart-open");

  cartOverlayElement.hidden = false;

  cartToggleElement.setAttribute("aria-expanded", "true");
}

function closeCart() {
  cartElement.classList.remove("open");

  document.body.classList.remove("cart-open");

  cartOverlayElement.hidden = true;

  cartToggleElement.setAttribute("aria-expanded", "false");
}

/* =========================================================
   TOAST
========================================================= */

let toastTimer;

function showToast(message) {
  toastElement.textContent = message;

  toastElement.classList.add("show");

  clearTimeout(toastTimer);

  toastTimer = setTimeout(() => {
    toastElement.classList.remove("show");
  }, 2800);
}

/* =========================================================
   HELPERS
========================================================= */

function formatMoney(number) {
  return new Intl.NumberFormat("en-US").format(number);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
