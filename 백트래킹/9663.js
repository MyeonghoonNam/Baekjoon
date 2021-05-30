'use strict';

const fs = require('fs');
const stdin = (
  process.platform === 'linux' ? fs.readFileSync('/dev/stdin').toString() : `8`
).split('\n');

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

console.log(Solution());

function Solution() {
  const N = Number(input());
  const map = [];
  let result = 0;

  const isPossible = (idx) => {
    for (let i = 0; i < idx; i++) {
      if (map[idx] === map[i] || idx - i === Math.abs(map[idx] - map[i])) {
        return false;
      }
    }

    return true;
  };

  const nQueen = (cnt) => {
    if (cnt === N) {
      result++;
      return;
    }

    for (let i = 0; i < N; i++) {
      map[cnt] = i;

      if (isPossible(cnt)) {
        nQueen(cnt + 1);
      }
    }
  };

  nQueen(0);

  return result;
}
