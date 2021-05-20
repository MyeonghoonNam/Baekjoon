const fs = require('fs');
const stdin = (
  process.platform === 'linux' ? fs.readFileSync('/dev/stdin').toString() : `0`
).split('\n');

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

console.log(Solution());

function Solution() {
  let N = Number(input());
  let sum = 1;

  while (N !== 0) {
    sum *= N;
    N--;
  }

  return sum;
}
