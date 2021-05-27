'use strict';

const fs = require('fs');
const stdin = (
  process.platform === 'linux'
    ? fs.readFileSync('/dev/stdin').toString()
    : `7 1 2 3 4 5 6 7
8 1 2 3 5 8 13 21 34
0`
).split('\n');

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

Solution();

function Solution() {
  let K = 0;
  let S = [];

  const selected = new Array(K).fill(false);
  const result = [];

  const dfs = (idx, cnt) => {
    if (cnt === 6) {
      console.log(result.join(' '));
      return;
    }

    for (let i = idx; i < K; i++) {
      if (!selected[i]) {
        selected[i] = true;
        result[cnt] = S[i];
        dfs(i, cnt + 1);
        selected[i] = false;
      }
    }
  };

  while (1) {
    const testcase = input().split(' ').map(Number);

    if (testcase[0] === 0) break;

    K = testcase[0];
    S = testcase.slice(1);

    dfs(0, 0);
    console.log();
  }
}
