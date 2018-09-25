const cWidth = window.innerWidth;
const cHeight = window.innerHeight;

class Blob {

  constructor(radius) {
    this.rad = radius;
  }

  show() {
    push();
    translate(width / 2, height / 2);
    beginShape();

    let xOffset = 0;

    for (let i = 0; i < TWO_PI; i += PI / 31.5) {

      const offset = map(noise(xOffset), 0, 1, 0, 100);
      const r = this.rad + offset;
      const x = r * cos(i);
      const y = r * sin(i);
      vertex(x, y);
      xOffset += 0.1;
    }
    endShape();
    pop();
  }
}

const blob = new Blob(250);

function setup() {
  createCanvas(cWidth, cHeight);
  noStroke();
  smooth();
  fill(0);
}

function draw() {
  blob.show();
}