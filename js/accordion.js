document.querySelectorAll(".price-card").forEach((card) => {
  card.querySelector(".price-header").addEventListener("click", () => {
    card.classList.toggle("active");
  });
});
