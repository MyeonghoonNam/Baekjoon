const fs = require('fs');
const stdin = (
  process.platform === 'linux'
    ? fs.readFileSync('/dev/stdin').toString()
    : `1 1
1000000000`
).split('\n');

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

console.log(Solution());

function Solution() {
  const [N, S] = input().split(' ').map(Number);
  const pos = input().split(' ').map(Number);
  const arr = [];

  for (let i = 0; i < N; i++) {
    arr.push(Math.abs(S - pos[i]));
  }

  let result = arr[0];
  for (let i = 1; i < arr.length; i++) {
    result = GCD(result, arr[i]);
  }

  return result;
}

function GCD(a, b) {
  while (b !== 0) {
    [a, b] = [b, a % b];
  }

  return a;
}
