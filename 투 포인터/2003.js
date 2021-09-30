const fs = require('fs');
const stdin = (
  process.platform === 'linux'
    ? fs.readFileSync('/dev/stdin').toString()
    : `10 5
1 2 3 4 2 5 3 1 1 2`
).split('\n');

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const [N, M] = input().split(' ').map(Number);
  const arr = input().split(' ').map(Number);

  let result = 0;
  let sum = 0;
  let end = 0;

  for(let start = 0; start < N; start++) {
    while(end < N && sum < M) {
      sum += arr[end];
      end++;
    }

    if(sum === M) {
      result++;
    }

    sum -= arr[start];
  }

  return result;
};

console.log(solution());
