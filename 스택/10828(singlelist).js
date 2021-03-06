const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const input = [];
rl.on('line', (line) => {
  // 입력
  input.push(line.split(' '));
}).on('close', () => {
  // 스택 자료구조 구현 - 단일 리스트
  class Node {
    constructor(value) {
      this.value = value;
      this.next = null;
    }
  }
  class Stack {
    constructor() {
      this.topElement = null;
      this.bottomElement = null;
      this.length = 0;
    }

    push(value) {
      const newNode = new Node(value);

      if (this.length !== 0) {
        const pointer = this.topElement;
        this.topElement = newNode;
        this.topElement.next = pointer;
      } else {
        this.topElement = newNode;
        this.bottomElement = newNode;
      }

      this.length++;
    }

    pop() {
      if (!this.topElement) {
        return -1;
      }

      if (this.topElement === this.bottomElement) {
        this.bottomElement = null;
      }

      const popNode = this.topElement;
      this.topElement = this.topElement.next;
      this.length--;

      return popNode.value;
    }

    size() {
      return this.length;
    }

    empty() {
      if (this.length === 0) {
        return -1;
      } else {
        return 0;
      }
    }

    top() {
      if (this.topElement) {
        return this.topElement.value;
      } else {
        return -1;
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
        console.log('잘못된 명령입니다.');
        return;
    }
  }

  console.log(callStack.join('\n'));
});
