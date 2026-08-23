const searchForm = document.getElementById("searchForm");
const countryInput = document.getElementById("countryInput");
const facts = document.getElementById("facts");

// Current REST Countries API
const API_URL = "https://api.restcountries.com/countries/v5";

// ========================================
// SEARCH COUNTRY
// ========================================

async function searchCountry(countryName) {
  try {
    // Show loading
    facts.innerHTML = `
      <p>Loading country information...</p>
    `;

    // API request
    const response = await fetch(
      `${API_URL}?q=${encodeURIComponent(countryName)}`,
      {
        headers: {
          Authorization: "Bearer rc_live_demo",
        },
      },
    );

    // Check response
    if (!response.ok) {
      throw new Error("Country not found");
    }

    // Convert response to JSON
    const result = await response.json();

    // IMPORTANT:
    // New API uses data.objects
    const countries = result?.data?.objects;

    // Check if country exists
    if (!countries || countries.length === 0) {
      throw new Error("Country not found");
    }

    // First matching country
    const country = countries[0];

    console.log("Country:", country);

    // Render country
    renderCountry(country);
  } catch (error) {
    console.error(error);

    facts.innerHTML = `
      <div class="error">

        <h2>Country Not Found ❌</h2>

        <p>
          We could not find "${countryName}".
          Please check the spelling and try again.
        </p>

      </div>
    `;
  }
}

// ========================================
// RENDER COUNTRY
// ========================================

function renderCountry(country) {
  // Country name
  const name = country.names?.common || "Unknown";

  // Official name
  const officialName = country.names?.official || "Not available";

  // Capital
  const capital = country.capitals?.[0]?.name || "No capital";

  // Population
  const population = country.population
    ? country.population.toLocaleString()
    : "Not available";

  // Region
  const region = country.region || "Not available";

  // Subregion
  const subregion = country.subregion || "Not available";

  // Area
  const area = country.area
    ? `${country.area.toLocaleString()} km²`
    : "Not available";

  // Currency
  let currency = "Not available";

  if (country.currencies) {
    currency = Object.values(country.currencies)
      .map((item) => {
        if (typeof item === "string") {
          return item;
        }

        return item.name || "Unknown";
      })
      .join(", ");
  }

  // Languages
  let languages = "Not available";

  if (Array.isArray(country.languages)) {
    languages = country.languages
      .map((language) => {
        if (typeof language === "string") {
          return language;
        }

        return language.name || language.common || language.native_name || "";
      })
      .filter(Boolean)
      .join(", ");
  }

  // Flag
  const flag = country.flag?.emoji || "🌍";

  // ========================================
  // DISPLAY COUNTRY
  // ========================================

  facts.innerHTML = `

    <article class="country-card">

      <div class="country-header">

        <div class="country-flag emoji-flag">
          ${flag}
        </div>

        <div>

          <h2>
            ${name}
          </h2>

          <p class="official-name">
            ${officialName}
          </p>

        </div>

      </div>


      <div class="facts-grid">


        <div class="fact">

          <span class="fact-label">
            Capital
          </span>

          <span class="fact-value">
            ${capital}
          </span>

        </div>


        <div class="fact">

          <span class="fact-label">
            Population
          </span>

          <span class="fact-value">
            ${population}
          </span>

        </div>


        <div class="fact">

          <span class="fact-label">
            Region
          </span>

          <span class="fact-value">
            ${region}
          </span>

        </div>


        <div class="fact">

          <span class="fact-label">
            Subregion
          </span>

          <span class="fact-value">
            ${subregion}
          </span>

        </div>


        <div class="fact">

          <span class="fact-label">
            Area
          </span>

          <span class="fact-value">
            ${area}
          </span>

        </div>


        <div class="fact">

          <span class="fact-label">
            Currency
          </span>

          <span class="fact-value">
            ${currency}
          </span>

        </div>


        <div class="fact">

          <span class="fact-label">
            Languages
          </span>

          <span class="fact-value">
            ${languages}
          </span>

        </div>


      </div>

    </article>
  `;
}

// ========================================
// FORM EVENT
// ========================================

searchForm.addEventListener("submit", function (event) {
  // Stop browser refresh
  event.preventDefault();

  // Get input
  const countryName = countryInput.value.trim();

  // Validate
  if (countryName === "") {
    facts.innerHTML = `
      <div class="error">

        <h2>Empty Search ⚠️</h2>

        <p>
          Please enter a country name.
        </p>

      </div>
    `;

    return;
  }

  // Search
  searchCountry(countryName);
});
