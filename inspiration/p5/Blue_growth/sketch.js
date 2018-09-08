var bugs = [];
var onPressed;

function setup() {
  createCanvas(720, 720);
  smooth();
  colorMode(RGB);
  rectMode(CENTER);

  background(255);
}

function draw() {
  background(255);
  
  if (onPressed) {
    for (var i = 0; i < 10; i++) {
      var newBug = new Jitter(touchX, touchY, i + bugs.lenght, i + bugs.lenght);
      bugs.push(newBug);
    }
  }

  /*if (mouseIsPressed) {
    for (var i = 0; i < 10; i++) {
      var newBug = new Jitter(touchX, touchY, i + bugs.lenght, i + bugs.lenght);
      bugs.push(newBug);
    }
  }*/

  for (var i = 0; i < bugs.length; i++) {
    bugs[i].update();
    bugs[i].display();
  }

  /*for (var i = bugs.length - 1; i > -1; i--) {
    if (dead) {
      bugs[i].remove();
    }
  }*/
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
    var newBug = new Jitter(touchX, touchY, i + bugs.length, i + bugs.length);
    bugs.push(newBug);
  }
}*/

/*function drawBug() {
  var bug = new Jitter(touchX, touchY);
  bugs.push(bug);
}*/

// Jitter class
function Jitter (x, y, xOffset, yOffset) {

  var loc = createVector(x, y);

  this.diameter = random(10, 30);

  /*var randDegrees = random(360);
  var vel = createVector(cos(radians(randDegrees)), sin(radians(randDegrees)));
  vel.mult(random(5));*/

  var acc = createVector(0, 0);
  var lifeSpan = random(30, 90);
  var decay = random(0.75, 0.9);
  var c = color(random(255), random(255), 255);
  var weightRange = random(3, 50);
  
  this.xOffset = xOffset;
  this.yOffset = yOffset;
  
  var passedLife, dead, alphaC, weight;

  this.update = function() {
    /*if (passedLife >= lifeSpan) {
      dead = true;
    } else {
      passedLife++;
    }*/

    alphaC = (lifeSpan - passedLife) / lifeSpan * 70 + 50;
    weight = (lifeSpan - passedLife) / lifeSpan * weightRange;

    /*acc.set(0,0);
    
    var rn = (noise((loc.x+frameCount+xOffset)*0.01, (loc.y+frameCount+yOffset)*0.01)-0.5)*4*PI;
    var magn = noise((loc.y+frameCount)*0.01, (loc.x+frameCount)*0.01);
    var dir = createVector(cos(rn), sin(rn));
    
    acc.add(dir);
    acc.mult(magn);
    
    var randDegrees = random(360);
    var randV = createVector(cos(radians(randDegrees)), sin(radians(randDegrees)));
    randV.mult(0.5);
    acc.add(randV);
     
    vel.add(acc);
    vel.mult(decay);
    vel.limit(3);
    loc.add(vel);*/
  }

  this.display = function() {
    strokeWeight(weight + 1.5);
    stroke(0, alphaC);
    //point(loc.x, loc.y);
    ellipse(loc.x, loc.y, this.diameter, this.diameter);

    strokeWeight(weight);
    stroke(c);
    //point(loc.x, loc.y);
    ellipse(loc.x, loc.y, this.diameter, this.diameter);
  };
}