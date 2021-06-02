'use strict';

const fs = require('fs');
const stdin = (
  process.platform === 'linux'
    ? fs.readFileSync('/dev/stdin').toString()
    : `4 9
8 52
6 80
26 42
2 72
51 19
39 11
37 29
81 3
59 5
79 23
53 7
43 33
77 21 `
).split('\n');

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

console.log(Solution());

function Solution() {
  const [N, M] = input().split(' ').map(Number);
  const los = new Array(101).fill(0);
  const dist = new Array(101).fill(0);

  for (let i = 0; i < N; i++) {
    const [num1, num2] = input().split(' ').map(Number);

    los[num1] = num2;
  }

  for (let i = 0; i < M; i++) {
    const [num1, num2] = input().split(' ').map(Number);

    los[num1] = num2;
  }

  const bfs = (idx) => {
    const q = [idx];
    let qIdx = 0;

    while (qIdx < q.length) {
      const pos = q[qIdx++];

      for (let i = 1; i <= 6; i++) {
        let nextPos = pos + i;

        if (nextPos > 100) continue;

        if (los[nextPos] !== 0) {
          nextPos = los[nextPos];
        }

        if (dist[nextPos] === 0) {
          dist[nextPos] = dist[pos] + 1;
          q.push(nextPos);
        }
      }
    }
  };

  bfs(1);

  return dist[100];
}
