// Exercise 1

const title = document.querySelector("#title");
title.textContent = "Addis Market";
title.classList.toggle("highlit");
// Exercise2

const cities = ["Addis Ababa", "Bahir Dar", "Hawassa"];
const cityList = document.querySelector("#cities");
cities.forEach((city) => {
  const li = document.createElement("li");
  li.textContent = city;
  cityList.append(li);
});
// Exercise 3
const button = document.querySelector("#test-button");
const buttonContainer = document.querySelector("#button-container");
button.addEventListener("click", (event) => {
  console.log("Button target:", event.target);
});
buttonContainer.addEventListener("click", () => {
  console.log("Div listener - bubbling happened");
});
// Exercise 4
const deleteList = document.querySelector("#delete-list");
deleteList.addEventListener("click", (event) => {
  if (event.target.matches(".delete")) {
    event.target.closest("li").remove();
  }
});

// Exercise 5

const simpleForm = document.querySelector("#simple-form");
const simpleInput = document.querySelector("#simple-input");
const simpleList = document.querySelector("#simple-list");

simpleForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const value = simpleInput.value.trim();
  if (!value) return;
  const li = document.createElement("li");
  li.textContent = value;
  simpleList.append(li);
  simpleInput.value = "";
});
// WEEK-2 PROJECT
// ==============================
const form = document.querySelector("#add-form");
const nameInput = document.querySelector("#name");
const priceInput = document.querySelector("#price");
const list = document.querySelector("#list");
const totalEl = document.querySelector("#total");
// Add item
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = nameInput.value.trim();
  const price = Number(priceInput.value);
  // Validation
  if (!name || !price || price <= 0) {
    alert("Please enter an item name and a valid price.");
    return;
  }
  addRow(name, price);
  form.reset();
  updateTotal();
});
// Create one shopping-list row
function addRow(name, price) {
  const li = document.createElement("li");
  li.classList.add("market-item");
  li.innerHTML = `
    <span class="item-info">
      <span>${name}</span>
      <span class="price">${price.toFixed(2)} ETB</span>
    </span>
    <button class="del" type="button">Delete</button>
  `;
  list.append(li);
}
// Event delegation
list.addEventListener("click", (event) => {
  // Delete
  if (event.target.matches(".del")) {
    event.target.closest("li").remove();
    updateTotal();
  }

  // Bought
  else if (event.target.closest("li")) {
    event.target.closest("li").classList.toggle("bought");
  }
});
// Calculate total
function updateTotal() {
  let total = 0;
  const items = list.querySelectorAll("li");
  items.forEach((item) => {
    const priceElement = item.querySelector(".price");
    const price = parseFloat(priceElement.textContent);
    total += price;
  });

  totalEl.textContent = total.toFixed(2);
}
