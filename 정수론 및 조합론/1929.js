const fs = require('fs');
const stdin = (
  process.platform === 'linux'
    ? fs.readFileSync('/dev/stdin').toString()
    : `3 16`
).split('\n');

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

console.log(Solution());

function Solution() {
  const [M, N] = input().split(' ').map(Number);
  const MAX = 1000000;
  const isPrime = [false, false];
  const result = [];

  for (let i = 2; i <= MAX; i++) {
    isPrime[i] = true;
  }

  for (let i = 2; i <= MAX; i++) {
    for (let j = 2 * i; j <= MAX; j += i) {
      if (!isPrime[j]) continue;

      isPrime[j] = false;
    }
  }

  for (let i = M; i <= N; i++) {
    if (isPrime[i]) {
      result.push(i);
    }
  }

  return result.join('\n');
}
