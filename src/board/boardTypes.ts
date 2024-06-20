export type Cell = {
  id: number;
  x: number;
  y: number;
}

export type Movement = {
  cell: Cell;
  destination: {
    x: number;
    y: number;
  };
  direction: Direction;
}

export enum Direction {
  Up,
  Down,
  Left,
  Right
}
