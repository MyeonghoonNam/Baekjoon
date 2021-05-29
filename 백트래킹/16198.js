'use strict';

const fs = require('fs');
const stdin = (
  process.platform === 'linux'
    ? fs.readFileSync('/dev/stdin').toString()
    : `10
1 1 1 1 1 1 1 1 1 1`
).split('\n');

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

console.log(Solution());

function Solution() {
  const N = Number(input());
  const W = input().split(' ').map(Number);
  const checked = new Array(10).fill(false);
  let result = 0;

  const dfs = (score, cnt) => {
    if (N - cnt === 2) {
      result = Math.max(result, score);
      return;
    }

    for (let i = 1; i < N - 1; i++) {
      if (checked[i]) continue;

      checked[i] = true;

      let left = i - 1;
      let right = i + 1;

      while (checked[left]) left--;
      while (checked[right]) right++;

      dfs(score + W[left] * W[right], cnt + 1);
      checked[i] = false;
    }
  };

  dfs(0, 0);

  return result;
}
