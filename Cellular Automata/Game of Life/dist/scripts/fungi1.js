const cWidth = window.innerWidth;
const cHeight = window.innerHeight;

function setup() {
  canvas(cWidth, cHeight);
}

function draw() {
  circle(mouseX, mouseY, 50, 50);
}
