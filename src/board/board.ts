"use client";

import p5 from 'p5';

const DIMENSION = 600;
const ROWS = 3;
const TOTAL_CELLS = ROWS * ROWS;
const CELL_DIMENSION = DIMENSION / ROWS;

function divideInt(a: number, b: number) { return Math.floor(a / b) };

const board = (p: p5) => {
  /* create boardData array, an array with N = ROWS x ROWS cells, first N - 1 cells have 
   * value {id}, last cell has value null
   */
  const boardData = [...Array.from({ length: TOTAL_CELLS - 1 }, (_, id) => id), null];

  p.setup = () => {
    p.createCanvas(DIMENSION, DIMENSION);
    p.background(200);
  };

  p.draw = () => {
    p.fill(255, 0, 0);

    boardData.forEach((id, index) => {
      if (id === null) return;
      p.rect
        (
          (index % ROWS) * CELL_DIMENSION,
          (divideInt(index, ROWS)) * CELL_DIMENSION,
          CELL_DIMENSION, CELL_DIMENSION
        )
    });
  };

};

export default board;
