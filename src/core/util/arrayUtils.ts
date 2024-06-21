function swapElements(arr: any[], i: number, j: number) {
  const arrCopy = arr.slice();

  const temp = arrCopy[i];
  arrCopy[i] = arrCopy[j];
  arrCopy[j] = temp;

  return arrCopy;
}

export { swapElements };

