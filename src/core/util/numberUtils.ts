function isOdd(num: number) {
  return num % 2 === 1;
}

function isEven(num: number) {
  return num % 2 === 0;
}

function divideInt(a: number, b: number) { return Math.floor(a / b) };


export { isOdd, isEven, divideInt };
