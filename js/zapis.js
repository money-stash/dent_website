const modal = document.getElementById("appointmentModal");
const openBtns = document.querySelectorAll(".zapisbtn");
const closeBtn = document.querySelector(".modal .close");
const form = document.getElementById("appointmentForm");
const response = document.getElementById("formResponse");

// відкриття модалки по кліку на будь-яку кнопку
openBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    modal.style.display = "block";
  });
});

// закриття модалки
closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

// закриття по кліку поза модалкою
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

// обробка форми
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = form.name.value.trim();
  const phone = form.phone.value.trim();
  const message = form.message.value.trim();

  if (!name || !phone) {
    response.textContent = "Будь ласка, заповніть обов’язкові поля.";
    response.style.color = "red";
    return;
  }

  response.textContent = "Заявка надіслана! Дякуємо.";
  response.style.color = "green";
  form.reset();
  setTimeout(() => {
    modal.style.display = "none";
    response.textContent = "";
  }, 2500);
});
