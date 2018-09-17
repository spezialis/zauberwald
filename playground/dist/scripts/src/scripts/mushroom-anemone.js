const cWidth = window.innerWidth;
const cHeight = window.innerHeight;
let shrooms = [];
let i = 0;

function setup() {
  createCanvas(cWidth, cHeight);
  noStroke();
  smooth();
  frameRate(25);
}

function draw() {
  // background(255, 255, 255, 10);
  if (i == 0) {
    shroom = new Rain(50);
    shroom.init();
    shrooms.push(shroom);
    i++;
  } else if (i < 10) {
    i++;
  } else if (i == 10) {
    i = 0;
  }

  for (shroom of shrooms) {
    shroom.grow();
  }
}

class Rain {

  constructor() {

    this.r = 185;
    this.g = 70;
    this.b = 180;
    this.radius = random(10, 50);
    this.posX = random(0, cWidth);
    this.posY = cHeight;
    this.speed = random(0, 5);
    this.randRate = random(0, 0.2);
  }

  init() {
    push();
    fill(255, 200, 250);
    ellipse(this.posX, this.posY, this.radius, this.radius);
    pop();
  }

  grow() {
    push();
    fill(this.r, this.g, this.b);
    // if(this.posY > cHeight - this.radius) {
    this.posY -= this.speed;
    this.posX = this.posX + random(-1, 1);
    // this.posX = random(0, 1) > 0.8 ? this.posX + random(-2, 2) : this.posX;
    // for (let i = 0; i < 100; i++) {
    //   if(i % 5) {
    //     this.posX = this.posX;
    //   }
    //   // this.posX = this.posX;
    // }
    this.radius -= this.randRate;
    if (this.radius > 0) ellipse(this.posX, this.posY, this.radius, this.radius);
    // }
    pop();
  }
}

function mouseClicked() {
  for (let i = 0; i < 5; i++) {
    shroom = new Rain(50);
    shroom.init();
    shrooms.push(shroom);
  }
}