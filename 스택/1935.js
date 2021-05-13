// 5
// ABC*+DE/-
// 1
// 2
// 3
// 4
// 5

// 1
// AA+A+
// 1

const fs = require('fs');
const stdin = (
  process.platform === 'linux'
    ? fs.readFileSync('/dev/stdin').toString()
    : `1
AA+A+
1`
).split('\n');

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

console.log(Solution());

function Solution() {
  const N = Number(input());
  const expression = input();
  const operand = [];
  const stack = [];

  for (let i = 0; i < N; i++) {
    operand[i] = Number(input());
  }

  for (let i = 0; i < expression.length; i++) {
    if (
      expression[i] === '+' ||
      expression[i] === '-' ||
      expression[i] === '*' ||
      expression[i] === '/'
    ) {
      const b = stack.pop();
      const a = stack.pop();

      switch (expression[i]) {
        case '+':
          stack.push(a + b);
          break;
        case '-':
          stack.push(a - b);
          break;
        case '*':
          stack.push(a * b);
          break;
        case '/':
          stack.push(a / b);
          break;
      }
    } else {
      stack.push(operand[expression[i].charCodeAt(0) - 'A'.charCodeAt(0)]);
    }
  }

  const top = stack.length - 1;

  return stack[top].toFixed(2);
}
