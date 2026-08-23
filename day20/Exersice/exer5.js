const output = document.getElementById("output");
const message = document.getElementById("message");
const refreshBtn = document.getElementById("refreshBtn");

const API_URL = "https://dummyjson.com/products";

// Fetch products
async function getProducts() {
  try {
    // 1. Show loading
    message.textContent = "Loading products...";

    output.innerHTML = `
      <div class="loading">
        Loading products...
      </div>
    `;

    // 2. Fetch API
    const response = await fetch(API_URL);

    // 3. Check response
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    // 4. Convert response to JSON
    const data = await response.json();

    // 5. Render products
    renderProducts(data.products);

    // 6. Success message
    message.textContent = `${data.products.length} products loaded successfully.`;
  } catch (error) {
    console.error(error);

    message.textContent = "Something went wrong.";

    output.innerHTML = `
      <div class="error">
        <h2>Unable to load products</h2>
        <p>
          Please check your internet connection and try again.
        </p>
      </div>
    `;
  }
}

// Render products
function renderProducts(products) {
  output.innerHTML = "";

  products.forEach((product) => {
    const card = document.createElement("article");

    card.className = "product-card";

    card.innerHTML = `
      <img
        src="${product.thumbnail}"
        alt="${product.title}"
      />

      <h2>${product.title}</h2>

      <p class="description">
        ${product.description}
      </p>

      <p class="price">
        $${product.price}
      </p>

      <p class="rating">
        ★ ${product.rating}
      </p>
    `;

    output.appendChild(card);
  });
}

// Refresh button
refreshBtn.addEventListener("click", getProducts);

// Load products when page opens
getProducts();
