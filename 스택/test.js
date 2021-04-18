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

const input = [
  [7],
  ['pop'],
  ['top'],
  ['push', 123],
  ['top'],
  ['pop'],
  ['top'],
  ['pop'],
];

const N = input[0][0];
input.shift();

const stack = new Stack();
const list = [];
for (let i = 0; i < N; i++) {
  const method = input[i][0];

  switch (method) {
    case 'push':
      stack.push(input[i][1]);
      break;
    case 'pop':
      list.push(stack.pop());
      break;
    case 'size':
      list.push(stack.size());
      break;
    case 'empty':
      list.push(stack.empty());
      break;
    case 'top':
      list.push(stack.top());
      break;
    default:
      console.log('잘못된 명령입니다.');
  }
}

console.log(list.join('\n'));
