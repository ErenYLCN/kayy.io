import { swapElements } from "@/core/util/arrayUtils";
import { divideInt, isEven, isOdd } from "@/core/util/numberUtils";


function getRandomColor() {
  return [Math.random() * 255, Math.random() * 255, Math.random() * 255];
}

function slidePuzzleShuffle(arr: any[], numberOfCols: number) {
  /* This shuffle must be special in order to ensure that
   * the puzzle is solvable.
   * see:
   * https://www.cs.princeton.edu/courses/archive/spring21/cos226/assignments/8puzzle/specification.php#:~:text=Thus%2C%20if%20a%20board%20has,inversions%2C%20then%20it%20is%20solvable.
   * */
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
    // If the puzzle is odd numbered, inversions must be even
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

function countInversions(array: any[]) {
  let inversions = 0;

  for (let i = 0; i < array.length; i++) {
    for (let j = i + 1; j < array.length; j++) {
      if (array[j] === null) continue;
      if (array[i] === null) continue;

      if (array[i] > array[j]) {
        inversions++;
      }
    }
  }

  return inversions;
}

function removeFirstInversion(arr: any[]) {
  let arrCopy = arr.slice();

  for (let i = 0; i < arrCopy.length; i++) {
    for (let j = i + 1; j < arrCopy.length; j++) {
      if (arrCopy[j] === null) continue;
      if (arrCopy[i] === null) continue;

      if (arrCopy[i] > arrCopy[j]) {
        arrCopy = swapElements(arrCopy, i, j);
        return arrCopy;
      }
    }
  }

  return arrCopy;
}

function addOneInversion(arr: any[]) {
  let arrCopy = arr.slice();
  for (let i = 0; i < arrCopy.length; i++) {
    for (let j = i + 1; j < arrCopy.length; j++) {
      if (arrCopy[j] === null) continue;
      if (arrCopy[i] === null) continue;

      if (arrCopy[i] < arrCopy[j]) {
        arrCopy = swapElements(arrCopy, i, j);
        return arrCopy;
      }
    }
  }

  return arrCopy;
}



export { getRandomColor, slidePuzzleShuffle, countInversions, removeFirstInversion, addOneInversion };
