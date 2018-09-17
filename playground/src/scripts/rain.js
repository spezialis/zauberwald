const cWidth = window.innerWidth;
const cHeight = window.innerHeight;
let drops = [];
let i = 0;


function setup() {
  createCanvas(cWidth, cHeight);
  noStroke();
  smooth();
  frameRate(25);

}

function draw() {
  background(255, 255, 255, 10);
  if (i == 0) {
    drop = new Rain(50);
    drop.init();
    drops.push(drop);
    i++
  } else if (i < 10) {
    i++
  }  else if (i == 10) {
    i = 0
  }

  for (drop of drops) {
    drop.fall();
  }
}

class Rain {

  constructor(){

    this.r = random(0, 255);
    this.g = random(0, 255);
    this.b = random(0, 255);
    this.radius = random(10, 50);
    this.posX = random(0, cWidth);
    this.posY = 0;
    this.speed = random(0, 5);
    this.randRate = random(0, 0.2);
  }

  init() {
    push()
    fill(this.r, this.g, this.b);
    ellipse(this.posX, this.posY, this.radius, this.radius);
    pop();
  }

  fall() {
    push()
    fill(this.r, this.g, this.b);
    if(this.posY < cHeight + this.radius) {
      this.posY += this.speed;
      this.posX = random(0, 1) > 0.8 ? this.posX + random(-2, 2) : this.posX;
      this.radius -= this.randRate;
      if(this.radius > 0) ellipse(this.posX, this.posY, this.radius, this.radius);
    }
    pop();
  }
}

function mouseClicked() {
  for (let i = 0; i < 5; i++) {
    drop = new Rain(50);
    drop.init();
    drops.push(drop);
  }
}
