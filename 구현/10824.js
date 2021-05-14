// 1000000 1000000 1000000 1000000
// 10 20 30 40
// 1 1 1 1

const fs = require('fs');
const stdin = (
  process.platform === 'linux'
    ? fs.readFileSync('/dev/stdin').toString()
    : `1 1 1 1`
).split('\n');

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

console.log(Solution());

function Solution() {
  const [A, B, C, D] = input().split(' ');

  let a = Number(A + B);
  let b = Number(C + D);

  return a + b;
}
