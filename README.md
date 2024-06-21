# kayy-io

This is a simple slider puzzle project built using Next.js 14 and p5.js. The puzzle ensures solvability based on the number of cells and inversions.

## Table of Contents

- [Introduction](#introduction)
- [Solvability Rules](#solvability-rules)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)

## Introduction

kayy-io is a simple slider puzzle game. The puzzle is rendered using p5.js, and the project is structured with Next.js 14. The puzzle is always solvable based on specific rules regarding the number of inversions and the position of the empty cell.

## Solvability Rules

For the slider puzzle to be solvable:

- If the puzzle has an odd number of cells, the number of inversions must be even.
- If the puzzle has an even number of cells, the sum of the number of inversions and the row index of the empty cell (starting from 1) must be odd.

### Inversions

An inversion is a situation where a higher-numbered tile precedes a lower-numbered tile when considering the puzzle in a single row (ignoring the empty cell). The puzzle is considered solvable if it meets the above rules for inversions based on the total number of cells.

## Technologies Used

- [Next.js 14](https://nextjs.org/)
- [p5.js](https://p5js.org/)

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes. Ensure that your code adheres to the project's coding standards and includes appropriate tests.
