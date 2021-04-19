const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const input = [];
rl.on('line', (line) => {
  // 입력 관리
  input.push(line);
}).on('close', () => {
  // 큐 구현(단일 연결 리스트 활용)
  class Node {
    constructor(value) {
      this.value = value;
      this.next = null;
    }
  }
  class Queue {
    constructor() {
      this.head = null;
      this.tail = null;
      this.length = 0;
    }

    push(value) {
      const newNode = new Node(value);

      if (this.length === 0) {
        this.head = newNode;
        this.tail = newNode;
        this.length++;
      } else if (this.head === this.tail) {
        this.head.next = newNode;
        this.tail = newNode;
        this.length++;
      } else {
        this.tail.next = newNode;
        this.tail = newNode;
        this.length++;
      }
    }

    pop() {
      if (this.length === 0) {
        return -1;
      }

      if (this.head === this.tail) {
        this.tail == null;
      }

      if (this.head !== null) {
        const popNode = this.head;

        this.head = popNode.next;
        this.length--;

        return popNode.value;
      }
    }

    size() {
      return this.length;
    }

    empty() {
      if (this.length === 0) {
        return 1;
      } else {
        return 0;
      }
    }

    front() {
      if (this.length === 0) {
        return -1;
      } else {
        return this.head.value;
      }
    }

    back() {
      if (this.length === 0) {
        return -1;
      } else {
        return this.tail.value;
      }
    }
  }

  const queue = new Queue();
  let result = '';

  input.forEach((str) => {
    const method = str.split(' ');

    switch (method[0]) {
      case 'push':
        queue.push(parseInt(method[1]));
        break;
      case 'pop':
        result += queue.pop() + '\n';
        break;
      case 'size':
        result += queue.size() + '\n';
        break;
      case 'empty':
        result += queue.empty() + '\n';
        break;
      case 'front':
        result += queue.front() + '\n';
        break;
      case 'back':
        result += queue.back() + '\n';
        break;
      default:
        break;
    }
  });

  console.log(result);
  process.exit();
});
