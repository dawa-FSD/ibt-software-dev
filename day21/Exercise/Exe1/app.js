const themeBtn = document.getElementById("themeBtn");

function restoreTheme() {
  const theme = localStorage.getItem("theme");

  if (theme === "dark") {
    document.body.classList.add("dark");
    themeBtn.textContent = "Light Mode";
  }
}

themeBtn.addEventListener("click", function () {
  document.body.classList.toggle("dark");

  const isDark = document.body.classList.contains("dark");

  localStorage.setItem("theme", isDark ? "dark" : "light");

  themeBtn.textContent = isDark ? "Light Mode" : "Dark Mode";
});

restoreTheme();
