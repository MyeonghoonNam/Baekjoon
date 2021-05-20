const fs = require('fs');
const stdin = (
  process.platform === 'linux'
    ? fs.readFileSync('/dev/stdin').toString()
    : `5
6
8
10
12
100`
).split('\n');

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

Solution();

function Solution() {
  const MAX = 1000000;
  const T = Number(input());
  const isPrime = [false, false];

  for (let i = 2; i <= MAX; i++) {
    isPrime[i] = true;
  }

  for (let i = 2; i <= MAX; i++) {
    for (let j = i * 2; j <= MAX; j += i) {
      isPrime[j] = false;
    }
  }

  for (let i = 0; i < T; i++) {
    const N = Number(input());
    let count = 0;

    for (let i = 2; i <= N / 2; i++) {
      if (isPrime[i] && isPrime[N - i]) {
        count++;
      }
    }

    console.log(count);
  }
}
