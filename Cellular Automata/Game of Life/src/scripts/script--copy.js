// const sWidth = window.innerWidth;
// const sHeight = window.innerHeight;
const sWidth = 640;
const sHeight = 480;
const w = 32;
const columns = Math.floor(sWidth/w);
const rows = Math.floor(sHeight/w);
let board = make2DArray(columns, rows);
let video;
let poseNet;
let poses = [];

//
// Game of Life
//


function setup() {
  createCanvas(sWidth, sHeight);
  frameRate(24);

  gol = new GOL();
  // gol.init();


  video = createCapture(VIDEO);
  video.size(sWidth, sHeight);

  // Create a new poseNet method with a single detection
  poseNet = ml5.poseNet(video, modelReady);

  // This sets up an event that fills the global variable "poses"
  // with an array every time new poses are detected

  poseNet.on('pose', function(results) {
    poses = results;
  });

  // Hide the video element, and just show the canvas
  video.hide();

  // img = loadImage("assets/wave.jpg");
  // img = createImg("https://www.askideas.com/media/14/Smile-Clipart.jpg");
  // img.hide();
}

function draw() {
  background(128);

  gol.generate();
  gol.display();
  // image(video, 0, 0, sWidth, sHeight);

  // We can call both functions to draw all keypoints and the skeletons
  drawKeypoints();
  // drawSkeleton();


  drawOnBodyPart(0);

  //print pose position

  // console.log(logPosePosition(0));
  // logPosePosition(0);
}

function mouseClicked() {
  gol.init();
}


function make2DArray(columnCount, rowCount) {

  const arr = new Array(columnCount);

  for(let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rowCount);
  }

  return arr;
}


class GOL {

  constructor() {

  }

  init() {
    for (let i =1;i < columns-1;i++) {
      for (let j =1;j < rows-1;j++) {
        board[i][j] = int(random(2));
      }
    }
  }

  generate() {

    let next = make2DArray(columns, rows);

    // Loop through every spot in our 2D array and check spots neighbors
    for (let x = 1; x < columns-1; x++) {
      for (let y = 1; y < rows-1; y++) {

        // Add up all the states in a 3x3 surrounding grid
        let neighbors = 0;
        for (let i = -1; i <= 1; i++) {
          for (let j = -1; j <= 1; j++) {
            neighbors += board[x+i][y+j];
          }
        }

        // A little trick to subtract the current cell's state since
        // we added it in the above loop
        neighbors -= board[x][y];

        // Rules of Life
        if      ((board[x][y] == 1) && (neighbors <  2)) next[x][y] = 0;           // Loneliness
        else if ((board[x][y] == 1) && (neighbors >  3)) next[x][y] = 0;           // Overpopulation
        else if ((board[x][y] == 0) && (neighbors == 3)) next[x][y] = 1;           // Reproduction
        else                                            next[x][y] = board[x][y];  // Stasis
      }
    }

    // Next is now our board
    board = next;
  }

  display() {
    for ( let i = 0; i < columns;i++) {
      for ( let j = 0; j < rows;j++) {
        if ((board[i][j] == 1)) fill(0);
        else fill(255);
        stroke(0);
        rect(i*w, j*w, w, w);
      }
    }
  }
}

//
// PoseNet
//

// Copyright (c) 2018 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
PoseNet example using p5.js
=== */

/* Points
| Id | Part |
| -- | -- |
| 0 | nose |
| 1 | leftEye |
| 2 | rightEye |
| 3 | leftEar |
| 4 | rightEar |
| 5 | leftShoulder |
| 6 | rightShoulder |
| 7 | leftElbow |
| 8 | rightElbow |
| 9 | leftWrist |
| 10 | rightWrist |
| 11 | leftHip |
| 12 | rightHip |
| 13 | leftKnee |
| 14 | rightKnee |
| 15 | leftAnkle |
| 16 | rightAnkle |
*/



function modelReady() {
  // select('#status').html('Model Loaded');
}


// A function to draw ellipses over the detected keypoints
function drawKeypoints()  {
  // Loop through all the poses detected
  for (let i = 0; i < poses.length; i++) {
    // For each pose detected, loop through all the keypoints
    let pose = poses[i].pose;
    for (let j = 0; j < pose.keypoints.length; j++) {
      // A keypoint is an object describing a body part (like rightArm or leftShoulder)
      let keypoint = pose.keypoints[j];
      // Only draw an ellipse is the pose probability is bigger than 0.2
      if (keypoint.score > 0.2) {
        fill(255, 0, 0);
        noStroke();
        ellipse(keypoint.position.x, keypoint.position.y, 10, 10);
      }
    }
  }
}

// A function to draw the skeletons
function drawSkeleton() {
  // Loop through all the skeletons detected
  for (let i = 0; i < poses.length; i++) {
    let skeleton = poses[i].skeleton;
    // For every skeleton, loop through all body connections
    for (let j = 0; j < skeleton.length; j++) {
      let partA = skeleton[j][0];
      let partB = skeleton[j][1];
      stroke(255, 0, 0);
      line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
    }
  }
}

function displayImg() {
  for (let i = 0; i < poses.length; i++) {
    // For each pose detected, loop through all the keypoints
    let pose = poses[i].pose;
    // Displays the image at point (0, height/2) at half size
    image(img, pose.keypoints[0].position.x, pose.keypoints[0].position.y, img.width/5, img.height/5);
  }
}

function logPosePosition(bodyPart) {
  for (let i = 0; i < poses.length; i++) {
    // For each pose detected, loop through all the keypoints
    let pose = poses[i].pose;

    // let position = createVector(pose.keypoints[bodyPart].position.x, pose.keypoints[bodyPart].position.y)
    if(pose.keypoints[bodyPart]) {
      return { x: pose.keypoints[bodyPart].position.x, y: pose.keypoints[bodyPart].position.y } ;

    } else {
      return;

    }

    // console.log(position.x);
  }
}

function drawOnBodyPart(bodyPart) {

  if (logPosePosition() != undefined) {
    for (let i =1;i < columns-1;i++) {
      board[i] = logPosePosition(bodyPart).x;
      for (let j =1;j < rows-1;j++) {
        board[i][j] = logPosePosition(bodyPart).y;
      }
    }

    console.log(logPosePosition(bodyPart));
  } else {
    return;
  }
}
