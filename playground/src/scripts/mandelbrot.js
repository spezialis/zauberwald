const cWidth = window.innerWidth;
const cHeight = window.innerHeight;
const maxIterations;


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

      let a = map(x, 0, cWidth, -2, 2);
      let b = map(y, 0, cHeight, -2, 2);
      let n = 0;
      let z = 0;
      let ca = a;
      let cb = b;

      while (n < maxIterations) {
        let aa = a*a - b*b;
        let bb = 2 * a * b;

        a = aa + ca;
        a = bb + cb;

        if (a + b > 16) {
          break;
        }

        n++;
      }

      var bright = map(n, 0, maxIterations, 0, 255);

      if (n == maxIterations) {
        // bright = 255;
      }

      let index = (x + y * cWidth) * 4;
      pixels [index] = bright;
      pixels [index + 1] = bright;
      pixels [index + 2] = bright;
      pixels [index + 3] = 255;
    }
  }
  updatePixels();
}
