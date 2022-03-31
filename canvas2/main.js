const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
const speed = 3;
class Circle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 64;
    this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
    this.speedX = Math.random() * speed - speed / 2;
    this.speedY = Math.random() * speed - speed / 2;
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
  update() {
    if (
      this.x - this.size + this.speedX <= 0 ||
      this.x + this.size + this.speedX >= canvas.width
    ) {
      if (this.speedX > 0) {
        this.speedX = ((Math.random() - 1) * speed) / 2;
      } else {
        this.speedX = (Math.random() * speed) / 2;
      }
    }
    if (
      this.y - this.size + this.speedY <= 0 ||
      this.y + this.size + this.speedY >= canvas.height
    ) {
      if (this.speedY > 0) {
        this.speedY = (Math.random() - 1) * 1.5;
      } else {
        this.speedY = Math.random() * 1.5;
      }
    }
    this.x += this.speedX;
    this.y += this.speedY;
  }
}

const circles = [];

for (let i = 0; i < 20; i++) {
  circles.push(new Circle());
}

function handleCircles() {
  for (let i = 0; i < circles.length; i++) {
    for (let j = 0; j < circles.length; j++) {
      const dx = circles[i].x - circles[j].x;
      const dy = circles[i].y - circles[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < 100) {
        ctx.beginPath();
        ctx.lineWidth = circles[i].size;
        ctx.strokeStyle = circles[i].color;
        ctx.moveTo(circles[i].x, circles[i].y);
        ctx.lineTo(circles[j].x, circles[j].y);
        ctx.stroke();
      }
    }
    circles[i].update();
    circles[i].draw();
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  handleCircles();
  requestAnimationFrame(animate);
}
animate();
