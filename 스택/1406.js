const fs = require('fs');
const stdin = (process.platform === 'linux'
  ? fs.readFileSync('/dev/stdin').toString()
  : `abc
9
L
L
L
L
L
P x
L
B
P y`
).split('\n');

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const str = input();
const T = Number(input());

const leftStack = [];
const rightStack = [];
const result = [];

for (let char of str) {
  leftStack.push(char);
}

for (let i = 0; i < T; i++) {
  const command = input().split(' ');

  switch (command[0]) {
    case 'L':
      if (leftStack.length > 0) {
        rightStack.push(leftStack.pop());
      }

      break;
    case 'D':
      if (rightStack.length > 0) {
        leftStack.push(rightStack.pop());
      }
      break;
    case 'B':
      if (leftStack.length > 0) {
        leftStack.pop();
      }

      break;
    case 'P':
      leftStack.push(command[1]);
      break;
    default:
      break;
  }
}

while (leftStack.length > 0) {
  rightStack.push(leftStack.pop());
}

while (rightStack.length > 0) {
  result.push(rightStack.pop());
}

console.log(result.join(''));
