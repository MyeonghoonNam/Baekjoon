'use strict';

const fs = require('fs');
const stdin = (
  process.platform === 'linux'
    ? fs.readFileSync('/dev/stdin').toString()
    : `3
1234 3412
1000 1
1 16`
).split('\n');

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

function DSLR(num) {
  let D = (num * 2) % 10000;
  let S = num == 0 ? 9999 : num - 1;
  let L = (num % 1000) * 10 + Math.floor(num / 1000);
  let R = (num % 10) * 1000 + Math.floor(num / 10);

  return [
    [D, 'D'],
    [S, 'S'],
    [L, 'L'],
    [R, 'R'],
  ];
}

function Bfs(start, end) {
  const visited = new Array(10000).fill(false);

  const q = [[start, '']];

  visited[start] = true;

  while (q.length > 0) {
    const [num, mod] = q.shift();

    if (num < 0) return;

    if (num === end) return mod;

    for (let next of DSLR(num)) {
      const [nextNum, operator] = next;

      if (!visited[nextNum]) {
        visited[nextNum] = true;
        q.push([nextNum, mod.concat('', operator)]);
      }
    }
  }
}

const T = Number(input());

for (let i = 0; i < T; i++) {
  const [A, B] = input().split(' ').map(Number);

  console.log(Bfs(A, B));
}
