"use client";

import p5 from 'p5';

import { swapElements } from '@/core/util/arrayUtils';
import { divideInt } from '@/core/util/numberUtils';

import { Cell, Direction, Movement } from './sketchTypes';
import { getRandomColor, slidePuzzleShuffle } from './sketchUtils';



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

    let boardData: (Cell | null)[] = randomizedBoardData.map((id, index) => {
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

    let clickedCell = {
      cell: null as Cell | null,
      x: 0,
      y: 0,
    }

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
            boardData = swapElements(boardData, nullIndex, nullIndex - 1);
            nullIndex -= 1;
            break;
          case Direction.Left:
            boardData = swapElements(boardData, nullIndex, nullIndex + 1);
            nullIndex += 1;
            break;
          case Direction.Up:
            boardData = swapElements(boardData, nullIndex, nullIndex + COLS);
            nullIndex += COLS;
            break;
          case Direction.Down:
            boardData = swapElements(boardData, nullIndex, nullIndex - COLS);
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

      if (p.keyCode === p.LEFT_ARROW || p.key === 'a') {
        var cell = boardData[nullIndex + 1];
        if (nullIndex % COLS !== COLS - 1 && cell !== null) {
          movementQueue.push({ cell, destination: { x: cell.x - CELL_DIMENSION, y: cell.y }, direction: Direction.Left });
        }
      }
      // TODO: "d" does not work for chrome, investigate
      else if (p.keyCode === p.RIGHT_ARROW || p.key === 'd') {
        var cell = boardData[nullIndex - 1];
        if (nullIndex % COLS !== 0 && cell !== null) {
          movementQueue.push({ cell, destination: { x: cell.x + CELL_DIMENSION, y: cell.y }, direction: Direction.Right });
        }
      }
      else if (p.keyCode === p.UP_ARROW || p.key === 'w') {
        var cell = boardData[nullIndex + COLS];
        if (divideInt(nullIndex, COLS) !== ROWS - 1 && cell !== null) {
          movementQueue.push({ cell, destination: { x: cell.x, y: cell.y - CELL_DIMENSION }, direction: Direction.Up });
        }
      }
      else if (p.keyCode === p.DOWN_ARROW || p.key === 's') {
        var cell = boardData[nullIndex - COLS];
        if (divideInt(nullIndex, COLS) !== 0 && cell !== null) {
          movementQueue.push({ cell, destination: { x: cell.x, y: cell.y + CELL_DIMENSION }, direction: Direction.Down });
        }
      }
    };

    //do it for mousedown
    p.mousePressed = () => {
      if (movementQueue.length > 0) return;

      const x = p.mouseX;
      const y = p.mouseY;

      const clickedCellIndex = boardData.findIndex(cell => {
        if (cell === null) return false;
        return x >= cell.x && x <= cell.x + CELL_DIMENSION && y >= cell.y && y <= cell.y + CELL_DIMENSION;
      });

      if (clickedCellIndex === -1) return;

      clickedCell = {
        cell: boardData[clickedCellIndex],
        x,
        y,
      };
    }

    p.mouseDragged = () => {
      const threshold = CELL_DIMENSION / 4;

      if (clickedCell.cell === null) return;

      const { x, y } = clickedCell;

      // push to movement queue based on direction
      if (p.mouseX - x > threshold) {
        var cell = boardData[nullIndex - 1];
        if (nullIndex % COLS !== 0 && cell !== null) {
          movementQueue.push({ cell, destination: { x: cell.x + CELL_DIMENSION, y: cell.y }, direction: Direction.Right });
          clickedCell = {
            cell: null,
            x: 0,
            y: 0,
          }
          return;
        }
      }
      else if (x - p.mouseX > threshold) {
        var cell = boardData[nullIndex + 1];
        if (nullIndex % COLS !== COLS - 1 && cell !== null) {
          movementQueue.push({ cell, destination: { x: cell.x - CELL_DIMENSION, y: cell.y }, direction: Direction.Left });
          clickedCell = {
            cell: null,
            x: 0,
            y: 0,
          }
          return;
        }
      }
      else if (p.mouseY - y > threshold) {
        var cell = boardData[nullIndex - COLS];
        if (divideInt(nullIndex, COLS) !== 0 && cell !== null) {
          movementQueue.push({ cell, destination: { x: cell.x, y: cell.y + CELL_DIMENSION }, direction: Direction.Down });
          clickedCell = {
            cell: null,
            x: 0,
            y: 0,
          }
          return;
        }
      }
      else if (y - p.mouseY > threshold) {
        var cell = boardData[nullIndex + COLS];
        if (divideInt(nullIndex, COLS) !== ROWS - 1 && cell !== null) {
          movementQueue.push({ cell, destination: { x: cell.x, y: cell.y - CELL_DIMENSION }, direction: Direction.Up });
          clickedCell = {
            cell: null,
            x: 0,
            y: 0,
          }
          return;
        }
      }
    }

    p.mouseReleased = () => {
      clickedCell = {
        cell: null,
        x: 0,
        y: 0,
      }
    }

    p.touchStarted = () => {
      p.mousePressed();
    }

    p.touchMoved = () => {
      p.mouseDragged();
    }

    p.touchEnded = () => {
      p.mouseReleased();
    }
  }
};

export default sketch;
