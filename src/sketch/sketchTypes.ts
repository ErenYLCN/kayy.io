export type Cell = {
  id: number;
  x: number;
  y: number;
  color: [number, number, number];
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
