const toggle = document.getElementById("mobileToggle");
const nav = document.getElementById("mainNav");
toggle.addEventListener("click", () => {
  nav.classList.toggle("open");
  toggle.classList.toggle("open");
});
