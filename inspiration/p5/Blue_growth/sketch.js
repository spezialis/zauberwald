var pts;
var onPressed;

function setup() {
  createCanvas(720, 720);
  smooth();
  colorMode(RGB);
  rectMode(CENTER);

  background(255);

  pts = [];
}

function draw() {
  //background(255);

  if (onPressed) {
    for (var i = 0; i < 10; i++) {
      var newP = new Jitter(touchX, touchY, i + pts.lenght, i + pts.lenght);
      pts.push(newP);
    }
  }

  /*if (mouseIsPressed) {
    for (var i = 0; i < 10; i++) {
      var newP = new Jitter(touchX, touchY, i + pts.lenght, i + pts.lenght);
      pts.push(newP);
    }
  }*/

  for (var j = 0; j < pts.length; j++) {
    pts[j].update();
    pts[j].display();
  }

  for (var k = pts.length - 1; k > -1; k--) {
    if (pts[k].dead) {
      pts[k].remove();
    }
  }
}

function mousePressed() {
  onPressed = true;
}

function mouseReleased() {
  onPressed = false;
}


/*function mousePressed() {
  //drawBug();
  for (var i = 0; i < 10; i++) {
    var newP = new Jitter(touchX, touchY, i + pts.length, i + pts.length);
    pts.push(newP);
  }
}*/

/*function drawBug() {
  var bug = new Jitter(touchX, touchY);
  pts.push(bug);
}*/

// Jitter class
function Jitter(x, y, xOffset, yOffset) {

  this.loc = createVector(x, y);
  this.diameter = random(10, 30);

  var randDegrees = random(360);
  this.vel = createVector(cos(radians(randDegrees)), sin(radians(randDegrees)));
  this.vel.mult(random(5));

  this.acc = createVector(0, 0);
  this.lifeSpan = random(30, 90);
  this.decay = random(0.75, 0.9);
  this.c = color(random(255), 150, random(255));
  this.weightRange = random(3, 50);

  this.xOffset = xOffset;
  this.yOffset = yOffset;

  this.passedLife;
  this.dead;

  this.alphaC;
  this.weight;

  this.update = function() {
    if (this.passedLife >= this.lifeSpan) {
      this.dead = true;
    } else {
      this.passedLife++;
    }

    //print("frameCount: " + frameCount);

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
    //strokeWeight(this.weight + 1.5);
    //stroke(0, this.alphaC);
    //point(this.loc.x, this.loc.y);
    //ellipse(this.loc.x, this.loc.y, this.diameter, this.diameter);

    strokeWeight(this.weight);
    stroke(this.c);
    //fill(this.c);
    point(this.loc.x, this.loc.y);
    //ellipse(this.loc.x, this.loc.y, this.diameter, this.diameter);
  };
}
