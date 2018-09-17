const cWidth = window.innerWidth;
const cHeight = window.innerHeight;
// const cWidth = 200;
// const cHeight = 200;
let xPos = cWidth/2;
let yPos = cHeight/2;
let noiseTime = 0;
const scale = 20;

function setup() {
  createCanvas(cWidth, cHeight);
  noStroke();
  smooth();
  frameRate(60);
  fill(0);
  xPos = cWidth/2;
  yPos = cHeight/2;
  pixelDensity(1);
}

function draw() {
  background(255, 255, 255, 20);

  xPos = noise(noiseTime)*cWidth;
  yPos = noise(noiseTime*0.8)*cHeight;

  let increment = 0.01;
  let xOffset = 0;
  // yPos = c
  // ellipse(xPos, yPos, 50, 50);

  noiseTime += 0.01;

  loadPixels();

  for(let x = 0; x < cWidth; x++) {

    let yOffset = 0;

    for(let y = 0; y < cHeight; y++) {
      let index = (x + y * cWidth) * 4

      let n = noise(yOffset, xOffset) * 255;

      pixels [index] = n;
      pixels [index + 1] = n;
      pixels [index + 2] = n;
      pixels [index + 3] = 255;

      yOffset += increment;
    }
    xOffset += increment;
  }
  updatePixels();

  // noLoop();

}
