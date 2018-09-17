// const cWidth = window.innerWidth;
// const cHeight = window.innerHeight;
const cWidth = 640;
const cHeight = 480;
const blobNumber = 2;
let blobs = [];

class Blob {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.rad = 40;
  }

  show() {
    noFill();
    stroke(0);
    ellipse(this.pos.x, this.pos.y, this.rad * 2, this.rad * 2);
    // ellipse(this.pos.x, this.pos.y, this.rad*2, this.rad*2)
  }

  follow() {
    this.pos.x = mouseX;
    this.pos.y = mouseY;
  }

}

function setup() {
  createCanvas(cWidth, cHeight);
  noStroke();
  smooth();
  frameRate(25);
  pixelDensity(1);

  for (let i = 0; i < blobNumber; i++) {
    blobs[i] = new Blob(100 * i + 100, 100 * i + 100);
  }
}

function draw() {

  loadPixels();

  for (let x = 0; x < cWidth; x++) {
    for (let y = 0; y < cHeight; y++) {

      let index = (x + y * cWidth) * 4;

      const pos = createVector(x, y);
      // const col = 1000 * blobs[0].rad / dist;
      let sum = 0;

      for (let i = 0; i < blobNumber; i++) {
        const dist = blobs[i].pos.dist(pos);
        sum += 200 * blobs[i].rad / dist;
      }

      pixels[index] = 255 - sum;
      pixels[index + 1] = 255 - sum;
      pixels[index + 2] = 255 - sum;
      pixels[index + 3] = 255;
    }
  }
  updatePixels();

  // blobs[1].show();
  // blobs[0].show();
  blobs[0].follow();

  // console.log(blobs[0]);
  // console.log(blobs[1]);
}