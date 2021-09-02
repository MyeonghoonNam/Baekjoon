const fs = require('fs');
const stdin = (
  process.platform === 'linux'
    ? fs.readFileSync('/dev/stdin').toString()
    : `5 2
4 1 2 3 5`
).split('\n');

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const [N, K] = input().split(' ').map(Number);
  const arr = input().split(' ').map(Number);

  arr.sort((a, b) => a - b);

  return arr[K - 1];
};

console.log(solution());
