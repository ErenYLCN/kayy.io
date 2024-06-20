import { Cell, Direction } from "./boardTypes";

function divideInt(a: number, b: number) { return Math.floor(a / b) };

function swap(arr: any[], i: number, j: number) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

export { divideInt, swap };
