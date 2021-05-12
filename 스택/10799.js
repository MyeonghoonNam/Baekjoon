const fs = require('fs');
const stdin = (
  process.platform === 'linux'
    ? fs.readFileSync('/dev/stdin').toString()
    : `()(((()())(())()))(())`
).split('\n');

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

console.log(Solution(input()));

function Solution(arr) {
  const stack = [];
  let result = 0;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === '(') {
      stack.push(arr[i]);
    } else {
      stack.pop();

      if (arr[i - 1] === '(') {
        result += stack.length;
      } else {
        result++;
      }
    }
  }

  return result;
}
