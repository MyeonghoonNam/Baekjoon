'use strict';

const fs = require('fs');
const stdin = (
  process.platform === 'linux'
    ? fs.readFileSync('/dev/stdin').toString()
    : `9
0 0 0 1 1 1 -1 -1 -1
0 0 0 1 1 1 -1 -1 -1
0 0 0 1 1 1 -1 -1 -1
1 1 1 0 0 0 0 0 0
1 1 1 0 0 0 0 0 0
1 1 1 0 0 0 0 0 0
0 1 -1 0 1 -1 0 1 -1
0 -1 1 0 1 -1 0 1 -1
0 1 -1 1 0 -1 0 1 -1`
).split('\n');

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

console.log(Solution());

function Solution() {
  const N = Number(input());
  const arr = [];

  let minusOneCount = 0;
  let zeroCount = 0;
  let oneCount = 0;

  for (let i = 0; i < N; i++) {
    arr[i] = input().split(' ').map(Number);
  }

  const divideAndConquer = (row, col, length) => {
    if (numberCheck(row, col, length)) {
      const value = arr[row][col];

      if (value === 0) {
        zeroCount++;
      } else if (value === 1) {
        oneCount++;
      } else {
        minusOneCount++;
      }
    } else {
      const newSize = length / 3;

      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          divideAndConquer(row + newSize * i, col + newSize * j, newSize);
        }
      }
    }
  };

  const numberCheck = (row, col, length) => {
    const value = arr[row][col];

    for (let i = row; i < row + length; i++) {
      for (let j = col; j < col + length; j++) {
        if (value !== arr[i][j]) return false;
      }
    }

    return true;
  };

  divideAndConquer(0, 0, N);

  return `${minusOneCount}\n${zeroCount}\n${oneCount}`;
}
