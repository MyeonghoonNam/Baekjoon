const fs = require('fs');
const stdin = (
  process.platform === 'linux'
    ? fs.readFileSync('/dev/stdin').toString()
    : `4
1 3 5 7`
).split('\n');

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

console.log(Solution());

function Solution() {
  const MAX = 1000;
  const N = Number(input());
  const arr = input().split(' ').map(Number);
  const isPrime = [false, false];
  let count = 0;

  for (let i = 2; i <= MAX; i++) {
    isPrime[i] = true;
  }

  // 에라토스테네스의 체
  for (let i = 2; i <= MAX; i++) {
    for (let j = i * 2; j <= MAX; j += i) {
      if (!isPrime[j]) continue;

      isPrime[j] = false;
    }
  }

  for (let i = 0; i < N; i++) {
    if (isPrime[arr[i]]) {
      count++;
    }
  }

  return count;
}
