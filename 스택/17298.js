const fs = require('fs');
const stdin = (
  process.platform === 'linux'
    ? fs.readFileSync('/dev/stdin').toString()
    : `4
3 5 2 7`
).split('\n');

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

console.log(solution());

function solution() {
  const N = Number(input());
  const arr = input().split(' ').map(Number);
  const result = [];
  const stack = [];

  for (let i = N - 1; i >= 0; i--) {
    let top = stack.length - 1;

    while (stack.length > 0 && stack[top] <= arr[i]) {
      stack.pop();
      top--;
    }

    if (stack.length === 0) {
      result[i] = -1;
    } else {
      result[i] = stack[top];
    }

    stack.push(arr[i]);
  }

  return result.join(' ');
}
