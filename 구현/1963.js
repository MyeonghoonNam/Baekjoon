'use strict';

const fs = require('fs');
const stdin = (
  process.platform === 'linux'
    ? fs.readFileSync('/dev/stdin').toString()
    : `3
1033 8179
1373 8017
1033 1033`
).split('\n');

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

Solution();

function Solution() {
  const T = Number(input());
  let result = 'Impossible';

  const numChange = (str, idx, char) => {
    const result = str.substr(0, idx) + char + str.substr(idx + char.length);

    return result;
  };

  const solve = (a, b) => {
    const MAX = 9999;
    const isPrime = [false, false];
    const visited = new Array(MAX + 1).fill(false);

    for (let i = 2; i <= MAX; i++) {
      isPrime[i] = true;
    }

    for (let i = 2; i <= MAX; i++) {
      for (let j = 2 * i; j <= MAX; j += i) {
        if (!isPrime[j]) continue;

        isPrime[j] = false;
      }
    }

    const bfs = (Start, Cnt) => {
      const q = [[Start, Cnt]];
      let qIdx = 0;

      visited[Start] = true;

      while (qIdx < q.length) {
        const [curNum, cnt] = q[qIdx++];

        if (curNum === b) {
          result = cnt;
          return;
        }

        for (let i = 0; i < 4; i++) {
          let nextNum = 0;

          for (let j = 0; j < 10; j++) {
            let str = curNum.toString();

            nextNum = parseInt(numChange(str, i, j.toString()));

            if (!isPrime[nextNum]) continue;
            if (visited[nextNum]) continue;
            if (nextNum < 1000 || nextNum > MAX) continue;

            visited[nextNum] = true;
            q.push([nextNum, cnt + 1]);
          }
        }
      }
    };

    bfs(a, 0);

    return result;
  };

  for (let i = 0; i < T; i++) {
    const [A, B] = input().split(' ').map(Number);

    console.log(solve(A, B));
  }
}
