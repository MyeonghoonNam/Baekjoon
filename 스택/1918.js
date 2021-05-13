const fs = require('fs');
const stdin = (
  process.platform === 'linux'
    ? fs.readFileSync('/dev/stdin').toString()
    : `A*(B+C)`
).split('\n');

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

console.log(Solution());

function Solution() {
  const expression = input();
  const stack = [];
  let result = '';

  for (let i = 0; i < expression.length; i++) {
    let top = stack.length - 1;

    if ('A' <= expression[i] && expression <= 'Z') {
      result += expression[i];
    } else {
      switch (expression[i]) {
        case '(':
          stack.push(expression[i]);
          break;
        case '*':
        case '/':
          while (
            stack.length > 0 &&
            (stack[top] === '*' || stack[top] === '/')
          ) {
            result += stack.pop();
            top--;
          }

          stack.push(expression[i]);
          break;
        case '+':
        case '-':
          while (stack.length > 0 && stack[top] !== '(') {
            result += stack.pop();
            top--;
          }

          stack.push(expression[i]);
          break;
        case ')':
          while (stack.length > 0 && stack[top] !== '(') {
            result += stack.pop();
            top--;
          }

          stack.pop();
          break;
      }
    }
  }

  while (stack.length > 0) {
    result += stack.pop();
  }

  return result;
}
