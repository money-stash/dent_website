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

// обробка відправки форми
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = form.name.value.trim();
  const phone = form.phone.value.trim();
  const messageText = form.message.value.trim();
  if (!name || !phone) {
    response.textContent = "Будь ласка, заповніть обов’язкові поля.";
    response.style.color = "red";
    return;
  }
  response.textContent = "Відправка...";
  response.style.color = "black";
  const formData = new FormData();
  formData.append("name", name);
  formData.append("phone", phone);
  formData.append("message", messageText);
  try {
    const res = await fetch("/api/appointment", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    if (!res.ok || !data.ok) {
      response.textContent = "Помилка відправки. Спробуйте пізніше.";
      response.style.color = "red";
      console.error("send error", data);
      return;
    }
    response.textContent = "Заявка надіслана! Дякуємо.";
    response.style.color = "green";
    form.reset();
    setTimeout(() => {
      modal.style.display = "none";
      response.textContent = "";
    }, 2000);
  } catch (err) {
    console.error(err);
    response.textContent = "Помилка мережі. Спробуйте пізніше.";
    response.style.color = "red";
  }
});
