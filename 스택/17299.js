const fs = require('fs');
const stdin = (
  process.platform === 'linux'
    ? fs.readFileSync('/dev/stdin').toString()
    : `7
1 1 2 3 4 2 1`
).split('\n');

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const N = Number(input());
const arr = input().split(' ').map(Number);
const stack = [];
const result = [];
const visited = new Array(10000001).fill(0);

for (let num of arr) {
  visited[num]++;
}

for (let i = N - 1; i >= 0; i--) {
  let top = stack.length - 1;

  while (stack.length > 0 && stack[top][0] <= visited[arr[i]]) {
    stack.pop();
    top--;
  }

  result[i] = stack.length > 0 ? stack[top][1] : -1;
  stack.push([visited[arr[i]], arr[i]]);
}

console.log(result.join(' '));
