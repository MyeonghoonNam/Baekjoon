'use strict';

const fs = require('fs');
const stdin = (
  process.platform === 'linux'
    ? fs.readFileSync('/dev/stdin').toString()
    : `6
10 20 10 30 20 50`
).split('\n');

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

Solution();

function Solution() {
  const N = Number(input());
  const numbers = input().split(' ').map(Number);
  const list = [numbers[0]];

  const binarySearch = (target) => {
    let low = 0;
    let high = list.length;

    while (low < high) {
      let mid = Math.floor((low + high) / 2);

      if (list[mid] < target) {
        low = mid + 1;
      } else {
        high = mid;
      }
    }

    if (list[high] >= target) return high;
  };

  for (let i = 1; i < N; i++) {
    const num = numbers[i];
    if (list[list.length - 1] < num) {
      list.push(num);
    } else {
      const idx = binarySearch(num);
      list[idx] = num;
    }
  }

  console.log(list.length);
  console.log(list.join(' '));
}
