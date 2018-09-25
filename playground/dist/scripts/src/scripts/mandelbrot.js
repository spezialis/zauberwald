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

  for (let x = 0; x < cWidth; x++) {
    for (let y = 0; y < cHeight; y++) {

      let index = (x + y * cWidth) * 4;
      let a = map(x, 0, cWidth, -2, 2);
      let b = map(y, 0, cHeight, -2, 2);
      let n = 0;
      let z = 0;
      let ca = a;
      let cb = b;

      while (n < 100) {
        let aa = a * a - b * b;
        let bb = 2 * a * b;

        a = aa + ca;
        a = bb + cb;

        if (abs(aa) + abs(bb) > 16) {
          break;
        }

        n++;
      }

      var bright = map(n, 0, 100, 0, 255);

      if (n == 100) {
        bright = 255;
      }

      pixels[index] = bright;
      pixels[index + 1] = bright;
      pixels[index + 2] = bright;
      pixels[index + 3] = 100;
    }
  }
  updatePixels();
}