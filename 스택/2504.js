const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `[][]((])`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

class Stack {
  constructor() {
    this.stack = [];
  }

  push(value) {
    this.stack.push(value);
  }

  pop() {
    if (this.size() === 0) return;

    const popValue = this.stack.pop();
    return popValue;
  }

  top() {
    return this.stack[this.size() - 1];
  }

  empty() {
    return this.size() === 0 ? true : false;
  }

  size() {
    return this.stack.length;
  }
}

const solution = () => {
  const str = input();
  const stack = new Stack();
  let result = 0;
  let temp = 1;

  for (let i = 0; i < str.length; i++) {
    const char = str[i];

    switch (char) {
      case "(":
        temp *= 2;
        stack.push(char);
        break;
      case "[":
        temp *= 3;
        stack.push(char);
        break;
      case ")": {
        if (stack.empty() || stack.top() !== "(") {
          return 0;
        }

        const prevChar = str[i - 1];

        if (prevChar === "(") {
          result += temp;
          temp = Math.floor(temp / 2);
        } else {
          temp = Math.floor(temp / 2);
        }

        stack.pop();

        break;
      }
      case "]": {
        if (stack.empty() || stack.top() !== "[") {
          return 0;
        }

        const prevChar = str[i - 1];

        if (prevChar === "[") {
          result += temp;
          temp = Math.floor(temp / 3);
        } else {
          temp = Math.floor(temp / 3);
        }

        stack.pop();

        break;
      }
      default:
        return false;
    }
  }

  if (!stack.empty()) {
    result = 0;
  }

  return result;
};

console.log(solution());
