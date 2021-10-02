const fs = require('fs');
const stdin = (
  process.platform === 'linux'
    ? fs.readFileSync('/dev/stdin').toString()
    : `9
5 12 7 10 9 1 2 3 11
13`
).split('\n');

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const N = Number(input());
  const arr = input().split(' ').map(Number);
  const X = Number(input());

  arr.sort((a, b) => a - b);

  let start = 0;
  let end = N - 1;
  let result = 0;

  while(start < end) {
    let sum = arr[start] + arr[end];

    if(sum <= X) {
      start++;
    } else if(sum > X) {
      end--;
    }

    if(sum === X) {
      result++;
    }
  }
  
  return result;
};

console.log(solution());
