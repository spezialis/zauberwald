const cWidth = 200;
const cHeight = 200;
let xPos = cWidth / 2;
let yPos = cHeight / 2;
let noiseTime = 0;
const scale = 10;

function setup() {
  createCanvas(cWidth, cHeight);
  smooth();
  frameRate(25);
  fill(0);
  pixelDensity(1);
}

function draw() {
  background(255, 255, 255, 20);

  let increment = 0.01;
  let xOffset = 0;
  let zOffset = 0;

  noiseTime += 0.01;

  for (let x = 0; x < cWidth; x++) {

    let yOffset = 0;

    for (let y = 0; y < cHeight; y++) {
      let index = (x + y * cWidth) * 4;

      let n = noise(yOffset, xOffset, zOffset) * TWO_PI;
      let v = p5.Vector.fromAngle(n);

      push();
      // fill(n);
      translate(x * scale, y * scale);
      rotate(v.heading());
      // rect(x * scale, y * scale, scale, scale);
      line(0, 0, scale, 0);
      pop();

      yOffset += increment;
      zOffset += 0.001;
    }
    xOffset += increment;
  }
}