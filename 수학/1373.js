const fs = require('fs');
const stdin = (
  process.platform === 'linux'
    ? fs.readFileSync('/dev/stdin').toString()
    : `11001100`
).split('\n');

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

console.log(Solution());

function Solution() {
  let num = input();
  let answer = '';

  while (num.length >= 3) {
    answer = parseInt(num.slice(num.length - 3), 2).toString(8) + answer;
    num = num.slice(0, num.length - 3);
  }

  if (num.length !== 0) {
    answer = parseInt(num, 2).toString(8) + answer;
  }

  return answer;
}
