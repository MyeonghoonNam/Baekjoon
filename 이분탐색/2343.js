'use strict';

const fs = require('fs');
const stdin = (
  process.platform === 'linux'
    ? fs.readFileSync('/dev/stdin').toString()
    : `9 3
1 2 3 4 5 6 7 8 9`
).split('\n');

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

console.log(Solution());

function Solution() {
  const [N, M] = input().split(' ').map(Number);
  const lesson = input().split(' ').map(Number);
  const maxLesson = Math.max(...lesson);

  const getBlueRayCount = (length) => {
    let sum = 0;
    let count = 0;

    for (let i = 0; i < N; i++) {
      sum += lesson[i];

      if (sum > length) {
        i--;
        sum = 0;
        count++;
      }
    }

    return count;
  };

  let left = maxLesson;
  let right = lesson.reduce((acc, cur) => acc + cur);

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const count = getBlueRayCount(mid);

    if (count >= M) left = mid + 1;
    else right = mid - 1;
  }

  return left;
}
