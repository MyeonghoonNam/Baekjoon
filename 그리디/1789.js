const fs = require('fs');
const stdin = (
  process.platform === 'linux'
    ? fs.readFileSync('/dev/stdin').toString()
    : `10`
).split('\n');

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const S = Number(input());
  let sum = 0;
  let result = 0;

  let num = 1;
  while(true) {
    sum += num;
    result++;

    if(sum > S) {
      result--;
      return result;
    }

    num++;
  }
};

console.log(solution());
