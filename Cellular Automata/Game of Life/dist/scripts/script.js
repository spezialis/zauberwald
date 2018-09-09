// const sWidth = window.innerWidth;
// const sHeight = window.innerHeight;
const sWidth = 640;
const sHeight = 320;
const w = 8;
const columns = Math.floor(sWidth / w);
const rows = Math.floor(sHeight / w);
let board = make2DArray(columns, rows); //
// Game of Life
//

function setup() {
  createCanvas(sWidth, sHeight);
  frameRate(24);
  gol = new GOL();
  gol.init();
}

function draw() {
  background(128);
  gol.generate();
  gol.display();
}

function mouseClicked() {
  gol.init();
}

function make2DArray(columnCount, rowCount) {
  const arr = new Array(columnCount);

  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rowCount);
  }

  return arr;
}

class GOL {
  constructor() {}

  init() {
    for (let i = 1; i < columns - 1; i++) {
      for (let j = 1; j < rows - 1; j++) {
        board[i][j] = int(random(2));
      }
    }
  }

  generate() {
    let next = make2DArray(columns, rows); // Loop through every spot in our 2D array and check spots neighbors

    for (let x = 1; x < columns - 1; x++) {
      for (let y = 1; y < rows - 1; y++) {
        // Add up all the states in a 3x3 surrounding grid
        let neighbors = 0;

        for (let i = -1; i <= 1; i++) {
          for (let j = -1; j <= 1; j++) {
            neighbors += board[x + i][y + j];
          }
        } // A little trick to subtract the current cell's state since
        // we added it in the above loop


        neighbors -= board[x][y]; // Rules of Life

        if (board[x][y] == 1 && neighbors < 2) next[x][y] = 0; // Loneliness
        else if (board[x][y] == 1 && neighbors > 3) next[x][y] = 0; // Overpopulation
          else if (board[x][y] == 0 && neighbors == 3) next[x][y] = 1; // Reproduction
            else next[x][y] = board[x][y]; // Stasis
      }
    } // Next is now our board


    board = next;
  }

  display() {
    console.log('display');

    for (let i = 0; i < columns; i++) {
      for (let j = 0; j < rows; j++) {
        if (board[i][j] == 1) fill(0);else fill(255);
        stroke(0);
        rect(i * w, j * w, w, w);
      }
    }
  }

}
