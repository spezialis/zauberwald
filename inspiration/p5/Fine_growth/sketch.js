var pts = [];
var onPressed;
var weight = true;

function setup() {
  createCanvas(720, 720);
  colorMode(RGB);

  background(255);
}

function draw() {
  // background(255);

  if (onPressed) {
    for (var i = 0; i < 10; i++) {
      var newP = new Jitter(touchX, touchY, i + pts.length, i + pts.length);
      pts.push(newP);
    }
  }

  for (var j = 0; j < pts.length; j++) {
    pts[j].update();
    pts[j].display();
  }

  if (weight) {
    background(255, 75);
  }
}

function mousePressed() {
  onPressed = true;
}

function mouseReleased() {
  onPressed = false;
}

function keyPressed() {
  if (keyCode === 67) {
    //print("c key pressed");
    for (var i = pts.length - 1; i > -1; i--) {
      // pts.remove(); doesn't work
      pts.pop(i);
    }

    background(255);
  }

  if (keyCode === 78) { // n
    for (var i = pts.length - 1; i > -1; i--) {
      // pts.remove(); doesn't work
      pts.pop(i);
    }

    weight = false;
    background(255);
    select('#status').html('Weight off');
  }

  if (keyCode === 71) { // g
    for (var i = pts.length - 1; i > -1; i--) {
      // pts.remove(); doesn't work
      pts.pop(i);
    }

    weight = true;
    background(255);
    select('#status').html('Weight on');
  }
}

// Jitter class
function Jitter(x, y, xOffset, yOffset) {

  this.loc = createVector(x, y);
  //this.diameter = random(10, 30);

  this.randDegrees = random(360);
  this.vel = createVector(cos(radians(this.randDegrees)), sin(radians(this.randDegrees)));
  this.vel.mult(random(5));

  this.acc = createVector(0, 0);
  this.lifeSpan = random(30, 90);
  this.decay = random(0.75, 0.9);

  this.alphaC;
  // var r = 231;
  // var g = random(158, 211);
  // var b = random(105, 120);
  // this.c = color(r, g, b);
  this.c = color(random(255), random(255), 255);

  this.weight;
  this.weightRange = random(3, 50);

  this.xOffset = xOffset;
  this.yOffset = yOffset;

  this.passedLife = 0;
  this.dead = false;

  this.update = function() {
    if (this.passedLife >= this.lifeSpan) {
      this.dead = true;
      //return this.lifeSpan < 0;
    } else {
      this.passedLife++;
    }

    this.alphaC = (this.lifeSpan - this.passedLife) / this.lifeSpan * 70 + 50;
    this.weight = (this.lifeSpan - this.passedLife) / this.lifeSpan * this.weightRange;

    this.acc.set(0, 0);

    this.rn = (noise((this.loc.x + frameCount + this.xOffset) * 0.01, (this.loc.y + frameCount + this.yOffset) * 0.01) - 0.5) * 4 * PI;
    this.magn = noise((this.loc.y + frameCount) * 0.01, (this.loc.x + frameCount) * 0.01);
    this.dir = createVector(cos(this.rn), sin(this.rn));

    this.acc.add(this.dir);
    this.acc.mult(this.magn);

    this.randDegrees = random(360);
    this.randV = createVector(cos(radians(this.randDegrees)), sin(radians(this.randDegrees)));
    this.randV.mult(0.5);
    this.acc.add(this.randV);

    this.vel.add(this.acc);
    this.vel.mult(this.decay);
    this.vel.limit(3);
    this.loc.add(this.vel);
  }

  this.display = function() {
    if (weight) {
      strokeWeight(this.weight + 1.5);
    } else {
      strokeWeight(0);
    }

    stroke(this.c, this.alphaC);
    point(this.loc.x, this.loc.y);
    //ellipse(this.loc.x, this.loc.y, this.diameter, this.diameter);

    if (weight) {
      strokeWeight(this.weight);
    } else {
      strokeWeight(0);
    }

    stroke(this.c);
    point(this.loc.x, this.loc.y);
  };
}
