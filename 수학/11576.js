const fs = require('fs');
const stdin = (
  process.platform === 'linux'
    ? fs.readFileSync('/dev/stdin').toString()
    : `17 8
2
2 16`
).split('\n');

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

console.log(Solution());

function Solution() {
  const [A, B] = input().split(' ').map(Number);
  const M = Number(input());
  const arr = input().split(' ').map(Number);
  const result = [];

  // A진법 --> 10진법
  let temp = 0;
  for (let i = 0, e = M - 1; i < M; i++, e--) {
    temp += arr[i] * Math.pow(A, e);
  }

  while (temp) {
    result.push(temp % B);
    temp = parseInt(temp / B);
  }

  return result.reverse().join(' ');
}
