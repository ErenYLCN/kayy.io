/**
 * Check if a number is odd
 * @param {number} num - The number to check
 */
function isOdd(num: number) {
  return num % 2 === 1;
}

/**
 * Check if a number is even
 * @param {number} num - The number to check
 */
function isEven(num: number) {
  return num % 2 === 0;
}

/**
 * Divide two numbers and return an integer
 * @param {number} a - The dividend
 * @param {number} b - The divisor
 */
function divideInt(a: number, b: number) { return Math.floor(a / b) };


export { isOdd, isEven, divideInt };
