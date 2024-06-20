"use client";

import p5 from 'p5';

const ROWS = 3;
const COLS = 4;
const CELL_DIMENSION = 200;
const TOTAL_CELLS = ROWS * COLS;
const CANVAS_WIDTH = CELL_DIMENSION * COLS;
const CANVAS_HEIGHT = CELL_DIMENSION * ROWS;

function divideInt(a: number, b: number) { return Math.floor(a / b) };

function swap(arr: any[], i: number, j: number) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

const board = (p: p5) => {
  /* create boardData array, an array with N = ROWS x ROWS cells, first N - 1 cells have 
   * value {id}, last cell has value null
   */
  const boardData =
    [
      ...Array.from(
        { length: TOTAL_CELLS - 1 },
        (_, id) => (
          {
            id,
            x: (id % COLS) * CELL_DIMENSION,
            y: (divideInt(id, COLS)) * CELL_DIMENSION
          }
        )
      ),
      null
    ];
  let nullIndex = TOTAL_CELLS - 1;

  p.setup = () => {
    p.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
    console.log(boardData);
  };

  p.draw = () => {
    p.background(200);
    p.fill(255, 0, 0);
    boardData.forEach((cell, index) => {
      if (cell === null) return;
      p.rect
        (
          cell.x,
          cell.y,
          CELL_DIMENSION, CELL_DIMENSION
        )
    });
  };

  p.keyPressed = () => {
    console.log(boardData);
    switch (p.keyCode) {
      case p.LEFT_ARROW:
        var cell = boardData[nullIndex + 1];
        if (nullIndex % COLS !== COLS - 1 && cell !== null) {
          swap(boardData, nullIndex, nullIndex + 1);
          nullIndex += 1;
          cell.x -= CELL_DIMENSION;
          p.clear();
        }
        break;
      case p.RIGHT_ARROW:
        var cell = boardData[nullIndex - 1];
        if (nullIndex % COLS !== 0 && cell !== null) {
          swap(boardData, nullIndex, nullIndex - 1);
          nullIndex -= 1;
          cell.x += CELL_DIMENSION;
          p.clear();
        }
        break;
      case p.UP_ARROW:
        var cell = boardData[nullIndex + COLS];
        if (divideInt(nullIndex, COLS) !== ROWS - 1 && cell !== null) {
          swap(boardData, nullIndex, nullIndex + COLS);
          nullIndex += COLS;
          cell.y -= CELL_DIMENSION;
          p.clear();
        }
        break;
      case p.DOWN_ARROW:
        var cell = boardData[nullIndex - COLS];
        if (divideInt(nullIndex, COLS) !== 0 && cell !== null) {
          swap(boardData, nullIndex, nullIndex - COLS);
          nullIndex -= COLS;
          cell.y += CELL_DIMENSION;
          p.clear();
        }
        break;
    }
  };
};

export default board;
