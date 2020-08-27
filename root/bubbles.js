const canvas = document.querySelector(".bubbles");
const ctx = canvas.getContext("2d");
const pieces = [];
const numberOfPieces = 4;
let lastUpdateTime = Date.now();

function update() {
  const now = Date.now();
  pieces.forEach((p) => {
    p.y -= p.gravity * (now - lastUpdateTime);
    if (p.y < -p.dim) p.reset();
  });

	lastUpdateTime = now;
	requestAnimationFrame(update);
}

function draw() {
  
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;

  pieces.forEach((p) => ctx.clearRect(p.x, p.y, p.dim, p.dim));

	pieces.forEach((p) => {
		ctx.fillStyle = "#000";
		ctx.beginPath();
    ctx.arc(p.x, p.y, p.dim / 2, 0, Math.PI * 2);
    ctx.fill();
	});

	requestAnimationFrame(draw);
}

function Piece(x, y) {
  const min = 20;
  const max = 200;
	this.x = x;
  this.y = y;
  this.setPosition = ({ x, y }) => {
    this.x = isNaN(x) ? Math.random() * canvas.width : x;
    this.y = isNaN(y) ? Math.random() * canvas.height : y;
  };
  this.setGravity = () => (this.gravity = (Math.random() * 0.5 + 0.75) * 0.2);
  this.setDim = () => (this.dim = Math.floor(Math.random() * (max - min + 1) + min));
  this.reset = () => {
    this.setPosition({ y: canvas.height });
    this.setGravity();
    this.setDim();
  }

  this.setPosition({ x, y });
  this.setGravity();
  this.setDim();
}

while (pieces.length < numberOfPieces) pieces.push(new Piece());

update();
draw();
