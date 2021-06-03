'use strict';

const fs = require('fs');
const stdin = (
  process.platform === 'linux'
    ? fs.readFileSync('/dev/stdin').toString()
    : `1 1 2`
).split('\n');

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

console.log(Solution());

function Solution() {
  const [A, B, C] = input().split(' ').map(Number);
  const D = A + B + C;
  const checked = Array.from(new Array(1000), () =>
    new Array(1000).fill(false)
  );

  let result = 0;

  const bfs = () => {
    const q = [[A, B]];
    let qIdx = 0;

    checked[A][B] = true;

    while (qIdx < q.length) {
      const [x, y] = q[qIdx++];
      const z = D - x - y;

      if (x === y && y === z) {
        result = 1;
        return;
      }

      const nx = [x, x, y];
      const ny = [y, z, z];

      for (let i = 0; i < 3; i++) {
        let a = nx[i];
        let b = ny[i];

        if (a < b) {
          b -= a;
          a += a;
        } else if (a > b) {
          a -= b;
          b += b;
        } else continue;

        let c = D - a - b;

        let X = Math.min(Math.min(a, b), c);
        let Y = Math.max(Math.max(a, b), c);

        if (!checked[X][Y]) {
          checked[X][Y] = true;
          q.push([X, Y]);
        }
      }
    }
  };

  if (D % 3 !== 0) {
    return result;
  } else {
    bfs();
  }

  return result;
}
