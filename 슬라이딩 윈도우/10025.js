const fs = require('fs');
const stdin = (
  process.platform === 'linux'
    ? fs.readFileSync('/dev/stdin').toString()
    : `4 3
4 7
10 15
2 2
5 1`
).split('\n');

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const [N, K] = input().split(' ').map(Number);
  const arr = new Array(1000001).fill(0);

  for(let i = 0; i < N; i++) {
    const [G, X] = input().split(' ').map(Number);

    arr[X] = G;
  }
  
  let sum = 0;
  let result = Number.MIN_SAFE_INTEGER;
  let step = 2 * K + 1;

  for(let i = 0; i <= 1000000; i++) {
    if(i >= step) {
      sum -= arr[i - step];
    }

    sum += arr[i];

    if(sum > result) {
      result = sum;
    }
  }

  return result;
};

console.log(solution());
