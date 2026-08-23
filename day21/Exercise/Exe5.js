const PHONE = /^(?:\+251|0)9\d{8}$/;

function validate(name, phone) {
  if (name.trim().length < 2) {
    return "Enter your full name.";
  }

  if (!PHONE.test(phone.trim())) {
    return "Enter a valid Ethiopian phone.";
  }

  return "";
}

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = nameInput.value.trim();
  const phone = phoneInput.value.trim();

  const message = validate(name, phone);

  error.textContent = message;

  if (message === "") {
    error.textContent = "Everything is valid!";
  }
});
