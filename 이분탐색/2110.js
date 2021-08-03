'use strict';

const fs = require('fs');
const stdin = (
  process.platform === 'linux'
    ? fs.readFileSync('/dev/stdin').toString()
    : `5 3
1
2
8
4
9`
).split('\n');

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

console.log(Solution());

function Solution() {
  const [N, C] = input().split(' ').map(Number);
  const arr = [];

  for (let i = 0; i < N; i++) {
    arr[i] = Number(input());
  }

  arr.sort((a, b) => a - b);

  let left = 1; // 최소 간격 거리
  let right = arr[N - 1] - arr[0]; // 최대 간격 거리

  let dist = 0; // 간격
  let result = 0;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    let start = arr[0];
    let count = 1;

    for (let i = 1; i < N; i++) {
      dist = arr[i] - start;

      if (mid <= dist) {
        count++;
        start = arr[i];
      }
    }

    if (count >= C) {
      result = mid;
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return result;
}
