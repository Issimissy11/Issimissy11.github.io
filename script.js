// ⭐️ Sterrenachtergrond
const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

function drawStar(x, y, spikes, outerRadius, innerRadius, color) {
  let rot = Math.PI / 2 * 3;
  let step = Math.PI / spikes;
  ctx.beginPath();
  ctx.moveTo(x, y - outerRadius);
  for (let i = 0; i < spikes; i++) {
    ctx.lineTo(x + Math.cos(rot) * outerRadius, y + Math.sin(rot) * outerRadius);
    rot += step;
    ctx.lineTo(x + Math.cos(rot) * innerRadius, y + Math.sin(rot) * innerRadius);
    rot += step;
  }
  ctx.lineTo(x, y - outerRadius);
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();
}

let stars = [];
for (let i = 0; i < 80; i++) {
  stars.push({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    outer: Math.random() * 6 + 4,
    inner: Math.random() * 2 + 1,
    dx: (Math.random() - 0.5) * 0.2,
    dy: (Math.random() - 0.5) * 0.2,
    color: `hsl(${Math.random() * 60 + 40},90%,80%)`
  });
}

function animateStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  stars.forEach(s => {
    drawStar(s.x, s.y, 5, s.outer, s.inner, s.color);
    s.x += s.dx;
    s.y += s.dy;
    if (s.x < 0 || s.x > canvas.width) s.dx *= -1;
    if (s.y < 0 || s.y > canvas.height) s.dy *= -1;
  });
  requestAnimationFrame(animateStars);
}
animateStars();

// 📁 Uitklapbare projectkaarten + video afspelen
const cards = document.querySelectorAll(".card");
const details = document.querySelectorAll(".project-details");

cards.forEach(card => {
  card.addEventListener("click", () => {
    const target = card.dataset.project;

    details.forEach(d => {
      const video = d.querySelector("video");
      if (d.id === target) {
        d.classList.toggle("active");
        if (video) {
          video.currentTime = 0;
          if (d.classList.contains("active")) video.play();
          else video.pause();
        }
      } else {
        d.classList.remove("active");
        if (video) video.pause();
      }
    });

    window.scrollTo({ top: card.offsetTop + 200, behavior: "smooth" });
  });
});



