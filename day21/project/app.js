const form = document.getElementById("signupForm");
const nameInput = document.getElementById("name");
const phoneInput = document.getElementById("phone");
const error = document.getElementById("error");
const count = document.getElementById("count");

const PHONE = /^(?:\+251|0)9\d{8}$/;
const STORAGE_KEY = "signupPeople";

function save(people) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(people));
}

function load() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);

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
  if (name.length < 2) {
    return "Enter your full name.";
  }

  if (!PHONE.test(phone)) {
    return "Enter a valid Ethiopian phone number.";
  }

  return "";
}

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = nameInput.value.trim();
  const phone = phoneInput.value.trim();

  const message = validate(name, phone);

  if (message !== "") {
    error.textContent = message;
    return;
  }

  const people = load();

  people.push({
    name: name,
    phone: phone,
  });

  save(people);

  error.textContent = "Signup successful.";

  form.reset();

  count.textContent = `${people.length} people have signed up.`;
});

function initialize() {
  const people = load();

  count.textContent = `${people.length} people have signed up.`;
}

initialize();
