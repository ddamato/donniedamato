const canvas = document.querySelector('.bubbles');
const ctx = canvas.getContext('2d');
const pieces = [];
const numberOfPieces = 6;
let lastUpdateTime = Date.now();

function draw() {
  const now = Date.now();
  if (canvas.width !== canvas.clientWidth) {
    canvas.width = canvas.clientWidth;
  }

  if (canvas.height !== canvas.clientHeight) {
    canvas.height = canvas.clientHeight;
  }

  if (window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
    pieces.forEach((p) => p.float(now - lastUpdateTime));
    pieces.forEach((p) => p.draw());
  }

  lastUpdateTime = now;
	requestAnimationFrame(draw);
}

function Piece(x, y) {
  const min = 8;
  const max = 200;
  const offset = 2;

	this.x = x;
  this.y = y;

  this.setGravity = () => (this.gravity = (Math.random() * 0.5 + 0.75) * 0.2);
  this.setDim = () => (this.dim = Math.floor(Math.random() * (max - min + 1) + min));
  this.setPosition = ({ x, y }) => {
    this.x = isNaN(x) ? Math.random() * canvas.width : x;
    this.y = isNaN(y) ? Math.random() * canvas.height : y;
    this.setGravity();
    this.setDim();
  };

  this.draw = () => {
    ctx.fillStyle = "#000";
    ctx.beginPath();
    ctx.arc(this.x + this.dim/2, this.y + this.dim/2, this.dim / 2, 0, Math.PI * 2);
    ctx.fill();
  }

  this.float = (amount) => {
    ctx.clearRect(this.x - offset, this.y - offset, this.dim + offset * 2, this.dim + offset * 2);
    this.y -= this.gravity * amount;
    if (this.y < -this.dim) this.setPosition({ y: canvas.height });
  }

  this.setPosition({ x, y });
}

while (pieces.length < numberOfPieces) pieces.push(new Piece());

draw();
