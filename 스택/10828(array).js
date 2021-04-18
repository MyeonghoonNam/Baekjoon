const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const input = [];
rl.on('line', (line) => {
  // 입력 관리
  input.push(line.split(' '));
}).on('close', () => {
  // 스택 구현 - 배열 활용
  class Stack {
    constructor() {
      this.list = [];
    }

    push(value) {
      this.list.push(value);
    }

    pop() {
      if (this.list.length === 0) {
        return -1;
      } else {
        return this.list.pop();
      }
    }

    size() {
      return this.list.length;
    }

    empty() {
      if (this.list.length === 0) {
        return 1;
      } else {
        return 0;
      }
    }

    top() {
      if (this.list.length === 0) {
        return -1;
      } else {
        return this.list[this.list.length - 1];
      }
    }
  }

  const N = input[0][0];
  input.shift();

  const stack = new Stack();
  const callStack = [];

  for (let i = 0; i < N; i++) {
    const method = input[i][0];

    switch (method) {
      case 'push':
        stack.push(input[i][1]);
        break;
      case 'pop':
        callStack.push(stack.pop());
        break;
      case 'size':
        callStack.push(stack.size());
        break;
      case 'empty':
        callStack.push(stack.empty());
        break;
      case 'top':
        callStack.push(stack.top());
        break;
      default:
        console.log('잘못된 명령 입니다.');
        return;
    }
  }

  console.log(callStack.join('\n'));

  process.exit();
});
