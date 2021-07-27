'use strict';

const fs = require('fs');
const stdin = (
  process.platform === 'linux'
    ? fs.readFileSync('/dev/stdin').toString()
    : `3 7 7`
).split('\n');

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

console.log(Solution());

function Solution() {
  const [N, r, c] = input().split(' ').map(Number);

  let count = 0;
  let result = 0;

  const divide = (x, y, size) => {
    if (r === y && c === x) {
      result = count;

      return;
    }

    if (r < y + size && r >= y && c < x + size && c >= x) {
      const newSize = size / 2;

      divide(x, y, newSize);
      divide(x + newSize, y, newSize);
      divide(x, y + newSize, newSize);
      divide(x + newSize, y + newSize, newSize);
    } else {
      count += size * size;
    }
  };

  divide(0, 0, Math.pow(2, N));

  return result;
}
