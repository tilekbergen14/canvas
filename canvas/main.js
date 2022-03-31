const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

const position = {
  x: undefined,
  y: undefined,
};
window.addEventListener("mousemove", (event) => {
  position.x = event.x;
  position.y = event.y;
  for (let i = 0; i < 1; i++) {
    particlesArray.push(new Particle());
  }
});
let deg = 0;
const particlesArray = [];
class Particle {
  constructor() {
    this.x = position.x;
    this.y = position.y;
    this.size = Math.random() * 16 + 1;
    this.speedX = Math.random() * 3 - 2;
    this.speedY = Math.random() * 3 - 2;
    this.color = `hsl(${deg}, 100%, 50%)`;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.size -= 0.2;
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function handleParticles() {
  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
    particlesArray[i].draw();
    for (let j = 0; j < particlesArray.length; j++) {
      const dx = particlesArray[i].x - particlesArray[j].x;
      const dy = particlesArray[i].y - particlesArray[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < 100) {
        ctx.beginPath();
        ctx.lineWidth = particlesArray[i].size;
        ctx.strokeStyle = particlesArray[i].color;
        ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
        ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
        ctx.stroke();
      }
    }
    if (particlesArray[i].size <= 0.2) {
      particlesArray.splice(i, 1);
      i--;
    }
  }
}

function animate() {
  //   ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  deg += 1;
  handleParticles();
  requestAnimationFrame(animate);
}
animate();
