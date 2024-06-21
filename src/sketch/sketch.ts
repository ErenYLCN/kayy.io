"use client";

import p5 from 'p5';

import { Cell, Direction, Movement } from './sketchTypes';
import { divideInt, getRandomColor, swap, slidePuzzleShuffle } from './sketchUtils';



const sketch = (rows: number, cellWidth: number, onWin: () => void) => {
  return (p: p5) => {
    const ROWS = rows;
    const COLS = ROWS;
    const CELL_DIMENSION = cellWidth;
    const TOTAL_CELLS = ROWS * COLS;
    const CANVAS_WIDTH = CELL_DIMENSION * COLS;
    const CANVAS_HEIGHT = CELL_DIMENSION * ROWS;

    // TODO: Implement speed based on FPS
    const CELL_MIN_SPEED = 3;
    const CELL_SLOW_MULTIPLIER = 5;

    const solution = [...Array.from({ length: TOTAL_CELLS - 1 }, (_, id) => id), null];
    const randomizedBoardData = slidePuzzleShuffle(solution, COLS);

    const boardData: (Cell | null)[] = randomizedBoardData.map((id, index) => {
      if (id === null) return null;

      const x = (index % COLS) * CELL_DIMENSION;
      const y = divideInt(index, COLS) * CELL_DIMENSION;

      return {
        id,
        x,
        y,
        color: getRandomColor()
      } as Cell;
    });

    let nullIndex = boardData.findIndex(cell => cell === null);

    let movementQueue: Movement[] = [];

    let gameWon = false;

    function handleMovementQueue() {
      if (movementQueue.length === 0) {
        const currentBoardData = boardData.map(cell => cell?.id);
        if (JSON.stringify(currentBoardData) === JSON.stringify(solution)) {
          gameWon = true;
          onWin();
        }
        return;
      }

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
        cell.x += destination.x - cell.x < CELL_MIN_SPEED ? destination.x - cell.x : (destination.x - cell.x) / CELL_SLOW_MULTIPLIER;
      }
      else if (direction === Direction.Left) {
        cell.x -= cell.x - destination.x < CELL_MIN_SPEED ? cell.x - destination.x : (cell.x - destination.x) / CELL_SLOW_MULTIPLIER;
      }
      else if (direction === Direction.Up) {
        cell.y -= cell.y - destination.y < CELL_MIN_SPEED ? cell.y - destination.y : (cell.y - destination.y) / CELL_SLOW_MULTIPLIER;
      }
      else if (direction === Direction.Down) {
        cell.y += destination.y - cell.y < CELL_MIN_SPEED ? destination.y - cell.y : (destination.y - cell.y) / CELL_SLOW_MULTIPLIER;
      }
    }

    p.setup = () => {
      p.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
    };

    p.draw = () => {
      p.background(0);
      p.strokeWeight(2);
      boardData.forEach((cell, _index) => {
        if (cell === null) return;
        p.fill(...cell.color);
        p.stroke(200);
        p.rect
          (
            cell.x,
            cell.y,
            CELL_DIMENSION, CELL_DIMENSION
          )
        p.fill(255);
        p.text(cell.id, cell.x + CELL_DIMENSION / 2 - CELL_DIMENSION / 20, cell.y + CELL_DIMENSION / 2);
      });

      if (!gameWon) {
        handleMovementQueue();
      }
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
  }
};

export default sketch;
