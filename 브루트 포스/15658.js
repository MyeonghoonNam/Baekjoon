'use strict';

const fs = require('fs');
const stdin = (
  process.platform === 'linux'
    ? fs.readFileSync('/dev/stdin').toString()
    : `6
1 2 3 4 5 6
3 2 1 1`
).split('\n');

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

console.log(Solution());

function Solution() {
  let MAX = -1000000000;
  let MIN = 1000000000;

  const N = Number(input());
  const arr = input().split(' ').map(Number);
  const operator = input().split(' ').map(Number);

  const dfs = (num, cnt) => {
    if (cnt === N) {
      MAX = Math.max(MAX, num);
      MIN = Math.min(MIN, num);

      return;
    }

    for (let i = 0; i < 4; i++) {
      if (operator[i] > 0) {
        operator[i]--;

        switch (i) {
          case 0:
            dfs(num + arr[cnt], cnt + 1);
            break;
          case 1:
            dfs(num - arr[cnt], cnt + 1);
            break;
          case 2:
            dfs(num * arr[cnt], cnt + 1);
            break;
          case 3:
            dfs(parseInt(num / arr[cnt]), cnt + 1);
            break;
        }

        operator[i]++;
      }
    }
  };

  dfs(arr[0], 1);

  return `${MAX}\n${MIN}`;
}
