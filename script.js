const h2 = document.createElement("h2");
h2.textContent = "This content added by Javascript";
document.querySelector("body").appendChild(h2);
// Dark mode toggle
const toggleButton = document.getElementById("theme-toggle");
toggleButton.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  toggleButton.textContent =
    document.body.classList.contains("dark-mode") ? "☀️" : "🌙";
});
