'use strict';

const fs = require('fs');
const stdin = (
  process.platform === 'linux'
    ? fs.readFileSync('/dev/stdin').toString()
    : `10 4790
1
5
10
50
100
500
1000
5000
10000
50000`
).split('\n');

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

console.log(Solution());

function Solution() {
  let [N, K] = input().split(' ').map(Number);
  const coins = [];

  for (let i = 0; i < N; i++) {
    coins[i] = Number(input());
  }

  coins.sort((a, b) => b - a);

  let cnt = 0;
  for (let value of coins) {
    if (K === 0) break;

    if (value <= K) {
      cnt += parseInt(K / value);
      K %= value;
    }
  }

  return cnt;
}
