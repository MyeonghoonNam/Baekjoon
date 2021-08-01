'use strict';

const fs = require('fs');
const stdin = (
  process.platform === 'linux'
    ? fs.readFileSync('/dev/stdin').toString()
    : `20 23`
).split('\n');

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

console.log(Solution());

function Solution() {
  const [N, K] = input().split(' ').map(Number);

  if (calculate(N) < K) return -1;

  let low = 1;
  let high = N;
  let answer = 0;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const len = calculate(mid);

    if (K > len) low = mid + 1;
    else {
      answer = mid;
      high = mid - 1;
    }
  }

  answer = String(answer);

  const l = calculate(Number(answer));
  const result = answer[answer.length - (l - K) - 1];

  return result;
}

function calculate(n) {
  let answer = 0;

  for (let start = 1, len = 1; start <= n; start *= 10, len++) {
    const end = start * 10 - 1;

    if (end >= n) {
      answer += (n - start + 1) * len;
    } else {
      answer += (end - start + 1) * len;
    }
  }

  return answer;
}
