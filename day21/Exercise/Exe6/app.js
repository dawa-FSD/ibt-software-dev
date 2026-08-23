function save(data) {
  localStorage.setItem("people", JSON.stringify(data));
}
function load() {
  try {
    const data = localStorage.getItem("people");
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}
let people = load();
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.querySelector("#name").value.trim();
  const phone = document.querySelector("#phone").value.trim();
  people.push({ name, phone });
  save(people);
  form.reset();
  count.textContent = `${people.length} people signed up.`;
});
count.textContent = `${people.length} people signed up.`;
