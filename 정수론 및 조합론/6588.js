const fs = require('fs');
const stdin = (
  process.platform === 'linux'
    ? fs.readFileSync('/dev/stdin').toString()
    : `8
20
42
0`
).split('\n');

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

Solution();

function Solution() {
  const MAX = 1000000;
  const isPrime = [false, false];

  for (let i = 2; i <= MAX; i++) {
    isPrime[i] = true;
  }

  for (let i = 2; i <= MAX; i++) {
    for (let j = 2 * i; j <= MAX; j += i) {
      if (!isPrime) continue;

      isPrime[j] = false;
    }
  }

  while (1) {
    const N = Number(input());
    let flag = false;

    if (N === 0) break;

    for (let i = 2; i <= N / 2; i++) {
      if (isPrime[i] && isPrime[N - i]) {
        console.log(`${N} = ${i} + ${N - i}`);
        flag = true;
        break;
      }
    }

    if (!flag) {
      console.log("Goldbach's conjecture is wrong.");
    }
  }
}
