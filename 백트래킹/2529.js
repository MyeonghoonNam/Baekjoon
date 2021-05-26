'use strict';

const fs = require('fs');
const stdin = (
  process.platform === 'linux'
    ? fs.readFileSync('/dev/stdin').toString()
    : `2
< >`
).split('\n');

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

console.log(Solution());

function Solution() {
  const K = Number(input());
  const operator = input().split(' ');

  const permutation = [];
  const visited = new Array(10).fill(false);
  const result = [];

  const check = (idx, c) => {
    if (c === '<') {
      if (permutation[idx] < permutation[idx + 1]) {
        return true;
      }

      return false;
    } else if (c === '>') {
      if (permutation[idx] > permutation[idx + 1]) {
        return true;
      }

      return false;
    }
  };

  const calculate = () => {
    for (let i = 0; i < K; i++) {
      if (!check(i, operator[i])) return false;
    }

    return true;
  };

  const dfs = (cnt) => {
    if (cnt === K + 1) {
      if (calculate()) {
        result.push(permutation.join(''));
      }

      return;
    }

    for (let i = 0; i < 10; i++) {
      if (!visited[i]) {
        visited[i] = true;
        permutation[cnt] = i;
        dfs(cnt + 1);
        visited[i] = false;
      }
    }
  };

  dfs(0);

  result.sort((a, b) => a - b);

  return `${result[result.length - 1]}\n${result[0]}`;
}
