"use client";

import p5 from 'p5';

import { Cell, Direction, Movement } from './boardTypes';
import { divideInt, swap } from './boardUtils';

const ROWS = 3;
const COLS = 4;
const CELL_DIMENSION = 200;
const TOTAL_CELLS = ROWS * COLS;
const CANVAS_WIDTH = CELL_DIMENSION * COLS;
const CANVAS_HEIGHT = CELL_DIMENSION * ROWS;
const CELL_SPEED = CELL_DIMENSION / 10;

const board = (p: p5) => {
  const boardData: (Cell | null)[] =
    [
      ...Array.from(
        { length: TOTAL_CELLS - 1 },
        (_, id) => (
          {
            id,
            x: (id % COLS) * CELL_DIMENSION,
            y: (divideInt(id, COLS)) * CELL_DIMENSION
          } as Cell
        )
      ),
      null
    ];
  let nullIndex = TOTAL_CELLS - 1;

  let movementQueue: Movement[] = []

  function handleMovementQueue() {
    if (movementQueue.length === 0) return;

    const movement = movementQueue[0];

    const { cell, destination, direction } = movement;

    if (cell.x === destination.x && cell.y === destination.y) {
      switch (direction) {
        case Direction.Right:
          swap(boardData, nullIndex, nullIndex - 1);
          nullIndex -= 1;
          break;
        case Direction.Left:
          swap(boardData, nullIndex, nullIndex + 1);
          nullIndex += 1;
          break;
        case Direction.Up:
          swap(boardData, nullIndex, nullIndex + COLS);
          nullIndex += COLS;
          break;
        case Direction.Down:
          swap(boardData, nullIndex, nullIndex - COLS);
          nullIndex -= COLS;
          break;
      }

      movementQueue.shift();

      return;
    }

    if (direction === Direction.Right) {
      if (destination.x - cell.x < CELL_SPEED) {
        cell.x = destination.x;
        return;
      }
      cell.x += CELL_SPEED;
    }
    else if (direction === Direction.Left) {
      if (cell.x - destination.x < CELL_SPEED) {
        cell.x = destination.x;
        return;
      }
      cell.x -= CELL_SPEED;
    }
    else if (direction === Direction.Up) {
      if (cell.y - destination.y < CELL_SPEED) {
        cell.y = destination.y;
        return;
      }
      cell.y -= CELL_SPEED;
    }
    else if (direction === Direction.Down) {
      if (destination.y - cell.y < CELL_SPEED) {
        cell.y = destination.y;
        return;
      }
      cell.y += CELL_SPEED;
    }
  }

  p.setup = () => {
    p.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
    console.log(boardData);
  };

  p.draw = () => {
    p.background(200);
    p.fill(255, 0, 0);
    boardData.forEach((cell, _index) => {
      if (cell === null) return;
      p.rect
        (
          cell.x,
          cell.y,
          CELL_DIMENSION, CELL_DIMENSION
        )
    });

    handleMovementQueue();
  };

  p.keyPressed = () => {
    if (movementQueue.length > 0) return;

    switch (p.keyCode) {
      case p.LEFT_ARROW:
        var cell = boardData[nullIndex + 1];
        if (nullIndex % COLS !== COLS - 1 && cell !== null) {
          movementQueue.push({ cell, destination: { x: cell.x - CELL_DIMENSION, y: cell.y }, direction: Direction.Left });
        }
        break;
      case p.RIGHT_ARROW:
        var cell = boardData[nullIndex - 1];
        if (nullIndex % COLS !== 0 && cell !== null) {
          movementQueue.push({ cell, destination: { x: cell.x + CELL_DIMENSION, y: cell.y }, direction: Direction.Right });
        }
        break;
      case p.UP_ARROW:
        var cell = boardData[nullIndex + COLS];
        if (divideInt(nullIndex, COLS) !== ROWS - 1 && cell !== null) {
          movementQueue.push({ cell, destination: { x: cell.x, y: cell.y - CELL_DIMENSION }, direction: Direction.Up });
        }
        break;
      case p.DOWN_ARROW:
        var cell = boardData[nullIndex - COLS];
        if (divideInt(nullIndex, COLS) !== 0 && cell !== null) {
          movementQueue.push({ cell, destination: { x: cell.x, y: cell.y + CELL_DIMENSION }, direction: Direction.Down });
        }
        break;
    }
  };
};

export default board;
