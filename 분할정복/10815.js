'use strict';

const fs = require('fs');
const { resourceLimits } = require('worker_threads');
const stdin = (
  process.platform === 'linux'
    ? fs.readFileSync('/dev/stdin').toString()
    : `5
6 3 2 10 -10
8
10 9 -5 2 3 4 5 -10`
).split('\n');

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

console.log(Solution());

function Solution() {
  const N = Number(input());
  const cardNum = input().split(' ').map(Number);

  const M = Number(input());
  const findNum = input().split(' ').map(Number);

  const result = [];

  cardNum.sort((a, b) => a - b);

  const binarySearch = (num) => {
    let low = 0;
    let high = cardNum.length - 1;

    while (low <= high) {
      let mid = Math.floor((low + high) / 2);

      if (cardNum[mid] < num) low = mid + 1;
      else if (cardNum[mid] > num) high = mid - 1;
      else return 1;
    }

    return 0;
  };

  findNum.forEach((num) => {
    const include = binarySearch(num);

    result.push(include);
  });

  return result.join(' ');
}
