/**
 * Swaps two elements in an array
 * @param {any[]} arr - The array to swap elements in
 * @param {number} i - The index of the first element to swap
 * @param {number} j - The index of the second element to swap
 */
function swapElements(arr: any[], i: number, j: number) {
  const arrCopy = arr.slice();

  const temp = arrCopy[i];
  arrCopy[i] = arrCopy[j];
  arrCopy[j] = temp;

  return arrCopy;
}

export { swapElements };

