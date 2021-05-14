const fs = require('fs');
const stdin = (
  process.platform === 'linux'
    ? fs.readFileSync('/dev/stdin').toString()
    : `baekjoon`
).split('\n');

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

console.log(Solution());

function Solution() {
  let str = input().split('');
  const result = [];

  while (str.length > 0) {
    result.push(str.join(''));
    str.shift();
  }

  return result.sort().join('\n');
}
