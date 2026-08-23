const form = document.getElementById("signupForm");
const nameInput = document.getElementById("name");
const phoneInput = document.getElementById("phone");
const errorMessage = document.getElementById("error");
const count = document.getElementById("count");
const signupList = document.getElementById("signupList");
const themeBtn = document.getElementById("themeBtn");

const SIGNUP_KEY = "signupPeople";
const THEME_KEY = "signupTheme";

const PHONE = /^(?:\+251|0)9\d{8}$/;

function save(people) {
  try {
    localStorage.setItem(SIGNUP_KEY, JSON.stringify(people));
  } catch (error) {
    console.error(error);
  }
}

function load() {
  try {
    const data = localStorage.getItem(SIGNUP_KEY);

    if (data === null) {
      return [];
    }

    const people = JSON.parse(data);

    if (!Array.isArray(people)) {
      return [];
    }

    return people;
  } catch (error) {
    return [];
  }
}

function validate(name, phone) {
  if (name.trim().length < 2) {
    return "Enter your full name.";
  }

  if (!PHONE.test(phone.trim())) {
    return "Enter a valid Ethiopian phone.";
  }

  return "";
}

function render(people) {
  count.textContent = `${people.length} people have signed up.`;

  signupList.textContent = "";

  people.forEach(function (person) {
    const li = document.createElement("li");

    li.textContent = `${person.name} — ${person.phone}`;

    signupList.appendChild(li);
  });
}

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = nameInput.value.trim();
  const phone = phoneInput.value.trim();

  const message = validate(name, phone);

  if (message !== "") {
    errorMessage.textContent = message;
    errorMessage.classList.remove("success");
    return;
  }

  const people = load();

  people.push({
    name: name,
    phone: phone,
  });

  save(people);

  form.reset();

  errorMessage.textContent = "Signup successful!";

  errorMessage.classList.add("success");

  render(people);
});

themeBtn.addEventListener("click", function () {
  document.body.classList.toggle("dark");

  const theme = document.body.classList.contains("dark") ? "dark" : "light";

  localStorage.setItem(THEME_KEY, theme);

  themeBtn.textContent = theme === "dark" ? "☀️ Light" : "🌙 Dark";
});

function restoreTheme() {
  const theme = localStorage.getItem(THEME_KEY);

  if (theme === "dark") {
    document.body.classList.add("dark");
    themeBtn.textContent = "☀️ Light";
  }
}

function initialize() {
  restoreTheme();

  const people = load();

  render(people);
}

initialize();
