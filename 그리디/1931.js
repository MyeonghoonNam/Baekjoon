'use strict';

const fs = require('fs');
const stdin = (
  process.platform === 'linux'
    ? fs.readFileSync('/dev/stdin').toString()
    : `11
1 4
3 5
0 6
5 7
3 8
5 9
6 10
8 11
8 12
2 13
12 14`
).split('\n');

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

console.log(Solution());

function Solution() {
  const N = Number(input());
  const times = [];

  for (let i = 0; i < N; i++) {
    times[i] = input().split(' ').map(Number);
  }

  times.sort((a, b) => {
    return a[1] - b[1] || a[0] - b[0];
  });

  let count = 0;
  let prevEndTime = 0;

  for (let i = 0; i < N; i++) {
    if (prevEndTime <= times[i][0]) {
      prevEndTime = times[i][1];
      count++;
    }
  }

  return count;
}
