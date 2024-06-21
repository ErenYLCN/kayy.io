import { swapElements } from "@/core/util/arrayUtils";
import { divideInt, isEven, isOdd } from "@/core/util/numberUtils";

/**
 * Returns a random color in the form of an array of RGB values.
 */
function getRandomColor() {
  return [Math.random() * 255, Math.random() * 255, Math.random() * 255];
}

/**
 * Shuffles the puzzle in a way that ensures it is solvable.
 * for more information on slide puzzle solvability see:
 * https://www.cs.princeton.edu/courses/archive/spring21/cos226/assignments/8puzzle/specification.php#:~:text=Thus%2C%20if%20a%20board%20has,inversions%2C%20then%20it%20is%20solvable.
 * @param {any[]} arr - The array to shuffle
 * @param {number | null} numberOfCols - The number of columns in the puzzle
 */
function slidePuzzleShuffle(arr: (number | null)[], numberOfCols: number) {
  let arrCopy = arr.slice();
  let currentIndex = arrCopy.length;

  // First do a normal Fisher-Yates shuffle
  while (currentIndex != 0) {

    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    arrCopy = swapElements(arrCopy, currentIndex, randomIndex);
  }

  if (isOdd(arrCopy.length)) {
    // If the puzzle is odd numbered, number of inversions must be even
    var inversions = countInversions(arrCopy);
    if (isOdd(inversions)) {
      arrCopy = removeFirstInversion(arrCopy);
    }
  }
  else {
    // If the puzzle is even numbered, inversions + row of the blank square must be odd
    var inversions = countInversions(arrCopy);
    if (isEven(inversions + divideInt(arrCopy.indexOf(null), numberOfCols))) {
      arrCopy = inversions === 0 ? addOneInversion(arrCopy) : removeFirstInversion(arrCopy);
    }
  }

  return arrCopy;
}

/**
 * Counts the number of inversion in an array.
 * An inversion is when a larger number comes before a smaller number.
 * @param {(number | null)[]} array - The array to count inversions in
 */
function countInversions(array: (number | null)[]) {
  let inversions = 0;

  for (let i = 0; i < array.length; i++) {
    for (let j = i + 1; j < array.length; j++) {
      if (array[j] === null) continue;
      if (array[i] === null) continue;

      if (array[i]! > array[j]!) {
        inversions++;
      }
    }
  }

  return inversions;
}

/**
 * Removes the first inversion in an array.
 * @param {(number | null)[]} arr - The array to remove the first inversion from
 */
function removeFirstInversion(arr: (number | null)[]) {
  let arrCopy = arr.slice();

  for (let i = 0; i < arrCopy.length; i++) {
    for (let j = i + 1; j < arrCopy.length; j++) {
      if (arrCopy[j] === null) continue;
      if (arrCopy[i] === null) continue;

      if (arrCopy[i]! > arrCopy[j]!) {
        arrCopy = swapElements(arrCopy, i, j);
        return arrCopy;
      }
    }
  }

  return arrCopy;
}

/**
 * Adds one inversion to an array.
 * @param {(number | null)[]} arr - The array to add an inversion to
 */
function addOneInversion(arr: (number | null)[]) {
  let arrCopy = arr.slice();
  for (let i = 0; i < arrCopy.length; i++) {
    for (let j = i + 1; j < arrCopy.length; j++) {
      if (arrCopy[j] === null) continue;
      if (arrCopy[i] === null) continue;

      if (arrCopy[i]! < arrCopy[j]!) {
        arrCopy = swapElements(arrCopy, i, j);
        return arrCopy;
      }
    }
  }

  return arrCopy;
}



export { getRandomColor, slidePuzzleShuffle, countInversions, removeFirstInversion, addOneInversion };
