const loading = document.getElementById("loading");
const refreshButton = document.getElementById("refresh");
const list = document.getElementById("list");

// JSON API
const API_URL = "https://dummyjson.com/recipes";

// Load dishes
async function loadDishes() {
  try {
    // Loading state
    loading.textContent = "Loading dishes...";
    list.innerHTML = `
      <li class="loading-card">
        Loading dishes...
      </li>
    `;

    // Fetch data
    const response = await fetch(API_URL);

    // Check HTTP error
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    // Convert response to JSON
    const data = await response.json();

    // Render dishes
    renderDishes(data.recipes);

    // Success message
    loading.textContent = `${data.recipes.length} dishes loaded successfully.`;
  } catch (error) {
    console.error("Error:", error);

    loading.textContent = "Failed to load dishes.";

    list.innerHTML = `
      <li class="error">
        <strong>Unable to load dishes.</strong>
        <br />
        Please check your internet connection and try again.
      </li>
    `;
  }
}

// Render dishes into DOM
function renderDishes(dishes) {
  list.innerHTML = "";

  dishes.forEach((dish, index) => {
    const li = document.createElement("li");

    li.className = "dish-card";

    li.innerHTML = `
      <div class="dish-number">${index + 1}</div>

      <h2>${dish.name}</h2>

      <p>
        ${dish.cuisine} cuisine · ${dish.difficulty}
      </p>
    `;

    list.appendChild(li);
  });
}

// Refresh button
refreshButton.addEventListener("click", loadDishes);

// Load data when page opens
loadDishes();
