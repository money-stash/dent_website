const track = document.getElementById("teamTrack");
const prevBtn = document.getElementById("teamPrev");
const nextBtn = document.getElementById("teamNext");
const viewport = document.querySelector(".carousel-viewport");
let items = Array.from(track.children);
let currentIndex = 0;
let itemsPerView = calcItemsPerView();

function calcItemsPerView() {
  const w = window.innerWidth;
  if (w <= 700) return 1;
  if (w <= 900) return 2;
  if (w <= 1100) return 3;
  return 4;
}

function update() {
  itemsPerView = calcItemsPerView();
  const gap = parseFloat(getComputedStyle(track).gap) || 16;
  const viewportWidth = viewport.clientWidth;
  const itemWidth = (viewportWidth - gap * (itemsPerView - 1)) / itemsPerView;
  items.forEach((el) => {
    el.style.minWidth = itemWidth + "px";
  });
  const maxIndex = Math.max(0, items.length - itemsPerView);
  if (currentIndex > maxIndex) currentIndex = maxIndex;
  track.style.transform = `translateX(${-currentIndex * (itemWidth + gap)}px)`;
  prevBtn.disabled = currentIndex <= 0;
  nextBtn.disabled = currentIndex >= maxIndex;
}

prevBtn.addEventListener("click", () => {
  currentIndex = Math.max(0, currentIndex - 1);
  update();
});

nextBtn.addEventListener("click", () => {
  const maxIndex = Math.max(0, items.length - itemsPerView);
  currentIndex = Math.min(maxIndex, currentIndex + 1);
  update();
});

window.addEventListener("resize", () => {
  requestAnimationFrame(update);
});

let startX = 0;
let deltaX = 0;
let isDragging = false;

track.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
  isDragging = true;
  deltaX = 0;
});

track.addEventListener("touchmove", (e) => {
  if (!isDragging) return;
  deltaX = e.touches[0].clientX - startX;
});

track.addEventListener("touchend", () => {
  if (!isDragging) return;
  isDragging = false;
  const threshold = Math.max(30, viewport.clientWidth * 0.08);
  if (deltaX > threshold) {
    currentIndex = Math.max(0, currentIndex - 1);
  } else if (deltaX < -threshold) {
    const maxIndex = Math.max(0, items.length - itemsPerView);
    currentIndex = Math.min(maxIndex, currentIndex + 1);
  }
  deltaX = 0;
  update();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") prevBtn.click();
  if (e.key === "ArrowRight") nextBtn.click();
});

update();
