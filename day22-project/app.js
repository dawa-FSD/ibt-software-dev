"use strict";

/*
==================================================
BIRR WATCH
Live ETB Exchange Rate Tracker
==================================================
*/

// ==================================================
// CONFIGURATION
// ==================================================

const API_URL = "https://open.er-api.com/v6/latest/ETB";

const STORAGE_KEY = "birrWatchState";

// ==================================================
// APPLICATION STATE
// ==================================================

const state = {
  rates: {},
  watchlist: [],
  loading: false,
  error: null,
  lastUpdated: null,
};

// ==================================================
// DOM REFERENCES
// ==================================================

const elements = {
  status: document.getElementById("status"),

  statusDot: document.getElementById("statusDot"),

  lastUpdated: document.getElementById("lastUpdated"),

  retryBtn: document.getElementById("retryBtn"),

  convertForm: document.getElementById("convertForm"),

  amount: document.getElementById("amount"),

  currency: document.getElementById("currency"),

  watchBtn: document.getElementById("watchBtn"),

  result: document.getElementById("result"),

  watchlist: document.getElementById("watchlist"),

  watchCount: document.getElementById("watchCount"),

  watchlistEmpty: document.getElementById("watchlistEmpty"),
};

// ==================================================
// FETCH RATES
// ==================================================

async function fetchRates() {
  setLoadingState();

  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const data = await response.json();

    if (data.result !== "success" || !data.rates) {
      throw new Error("Invalid exchange-rate response.");
    }

    // Update state

    state.rates = data.rates;

    state.lastUpdated = new Date();

    // Render

    renderCurrencies();

    renderWatchlist();

    updateStatusSuccess();
  } catch (error) {
    console.error("Birr Watch API error:", error);

    state.error = error.message;

    updateStatusError();
  }
}

// ==================================================
// LOADING STATE
// ==================================================

function setLoadingState() {
  state.loading = true;
  state.error = null;

  elements.status.textContent = "Loading live exchange rates...";

  elements.lastUpdated.textContent = "Connecting to exchange-rate service";

  elements.statusDot.className = "status-dot loading";

  elements.retryBtn.classList.add("hidden");
}

// ==================================================
// SUCCESS STATE
// ==================================================

function updateStatusSuccess() {
  state.loading = false;
  state.error = null;

  elements.status.textContent = "Live exchange rates loaded";

  elements.lastUpdated.textContent = `Updated ${formatTime(state.lastUpdated)}`;

  elements.statusDot.className = "status-dot success";

  elements.retryBtn.classList.add("hidden");
}

// ==================================================
// ERROR STATE
// ==================================================

function updateStatusError() {
  state.loading = false;

  elements.status.textContent = "Could not load exchange rates";

  elements.lastUpdated.textContent = "Check your connection and try again";

  elements.statusDot.className = "status-dot error";

  elements.retryBtn.classList.remove("hidden");

  elements.currency.innerHTML = `
    <option value="">
      Rates unavailable
    </option>
  `;

  elements.watchBtn.disabled = true;
}

// ==================================================
// RENDER CURRENCIES
// ==================================================

function renderCurrencies() {
  const currencies = Object.keys(state.rates)
    .filter((currency) => currency !== "ETB")
    .sort();

  elements.currency.innerHTML = `
    <option value="">
      Select currency
    </option>
  `;

  currencies.forEach((currency) => {
    const option = document.createElement("option");

    option.value = currency;

    option.textContent = currency;

    elements.currency.appendChild(option);
  });

  elements.watchBtn.disabled = currencies.length === 0;
}

// ==================================================
// CONVERTER
// ==================================================

elements.convertForm.addEventListener("submit", handleConversion);

function handleConversion(event) {
  event.preventDefault();

  const amount = Number(elements.amount.value);

  const currency = elements.currency.value;

  // Validate amount

  if (!Number.isFinite(amount) || amount <= 0) {
    showResult("Invalid amount", "Enter an amount greater than zero.");

    return;
  }

  // Validate currency

  if (!currency) {
    showResult("Choose a currency", "Select a currency before converting.");

    return;
  }

  // Get rate

  const rate = state.rates[currency];

  if (typeof rate !== "number") {
    showResult(
      "Rate unavailable",
      "This currency rate is not currently available.",
    );

    return;
  }

  // Calculate

  const converted = amount * rate;

  // Display

  showResult(
    `${formatNumber(amount)} ETB = ${formatNumber(converted)} ${currency}`,
    `Rate: 1 ETB = ${rate.toFixed(6)} ${currency}`,
  );
}

// ==================================================
// RESULT RENDER
// ==================================================

function showResult(title, description) {
  elements.result.innerHTML = "";

  const label = document.createElement("span");

  label.className = "result-label";

  label.textContent = "CONVERSION RESULT";

  const strong = document.createElement("strong");

  strong.textContent = title;

  const small = document.createElement("small");

  small.textContent = description;

  elements.result.append(label, strong, small);
}

// ==================================================
// WATCHLIST
// ==================================================

elements.watchBtn.addEventListener("click", handleAddToWatchlist);

function handleAddToWatchlist() {
  const currency = elements.currency.value;

  if (!currency) {
    showResult("Choose a currency", "Select a currency before adding it.");

    return;
  }

  const added = addToWatchlist(currency);

  if (added) {
    showResult(
      `${currency} added to watchlist`,
      "Your watchlist has been saved locally.",
    );
  } else {
    showResult(
      `${currency} is already saved`,
      "Duplicate currencies are not allowed.",
    );
  }
}

// ==================================================
// ADD WATCHLIST
// ==================================================

function addToWatchlist(currency) {
  if (state.watchlist.includes(currency)) {
    return false;
  }

  state.watchlist.push(currency);

  saveState();

  renderWatchlist();

  return true;
}

// ==================================================
// RENDER WATCHLIST
// ==================================================

function renderWatchlist() {
  elements.watchlist.innerHTML = "";

  elements.watchCount.textContent = state.watchlist.length;

  if (state.watchlist.length === 0) {
    elements.watchlistEmpty.classList.remove("hidden");

    return;
  }

  elements.watchlistEmpty.classList.add("hidden");

  state.watchlist.forEach((currency) => {
    const li = document.createElement("li");

    li.className = "watchlist-item";

    const info = document.createElement("div");

    info.className = "currency-info";

    const name = document.createElement("strong");

    name.textContent = currency;

    const rate = document.createElement("small");

    const value = state.rates[currency];

    if (typeof value === "number") {
      rate.textContent = `1 ETB = ${value.toFixed(6)} ${currency}`;
    } else {
      rate.textContent = "Rate unavailable";
    }

    info.append(name, rate);

    const deleteButton = document.createElement("button");

    deleteButton.type = "button";

    deleteButton.className = "delete-btn";

    deleteButton.dataset.currency = currency;

    deleteButton.textContent = "Remove";

    li.append(info, deleteButton);

    elements.watchlist.appendChild(li);
  });
}

// ==================================================
// EVENT DELEGATION
// ==================================================

elements.watchlist.addEventListener("click", handleWatchlistClick);

function handleWatchlistClick(event) {
  const button = event.target.closest(".delete-btn");

  if (!button) {
    return;
  }

  const currency = button.dataset.currency;

  removeFromWatchlist(currency);
}

// ==================================================
// REMOVE WATCHLIST
// ==================================================

function removeFromWatchlist(currency) {
  state.watchlist = state.watchlist.filter((item) => item !== currency);

  saveState();

  renderWatchlist();
}

// ==================================================
// LOCAL STORAGE
// ==================================================

function saveState() {
  const data = {
    watchlist: state.watchlist,
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// ==================================================
// LOAD STATE
// ==================================================

function loadState() {
  const saved = localStorage.getItem(STORAGE_KEY);

  if (!saved) {
    return;
  }

  try {
    const parsed = JSON.parse(saved);

    if (Array.isArray(parsed.watchlist)) {
      state.watchlist = parsed.watchlist;
    }
  } catch (error) {
    console.error("Could not restore saved state:", error);
  }
}

// ==================================================
// RETRY
// ==================================================

elements.retryBtn.addEventListener("click", fetchRates);

// ==================================================
// FORMAT NUMBER
// ==================================================

function formatNumber(number) {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(number);
}

// ==================================================
// FORMAT TIME
// ==================================================

function formatTime(date) {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
  }).format(date);
}

// ==================================================
// APPLICATION START
// ==================================================

function init() {
  loadState();

  renderWatchlist();

  fetchRates();
}

// Start application

init();
