const cWidth = window.innerWidth;
const cHeight = window.innerHeight;

function setup() {
  createCanvas(cWidth, cHeight);
  noStroke();
  smooth();
  frameRate(25);
  pixelDensity(1);
}

function draw() {

  loadPixels();

  for(let x = 0; x < cWidth; x++) {
    for(let y = 0; y < cHeight; y++) {
      
      let index = (x + y * cWidth) * 4

      pixels [index] = x+y;
      pixels [index + 1] = x;
      pixels [index + 2] = y;
      pixels [index + 3] = 100;
    }
  }
  updatePixels();
}
