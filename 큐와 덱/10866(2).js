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
  // 구현
  // 이중 연결 리스트 활용하여 구현
  class Node {
    constructor(value) {
      this.value = value;
      this.next = null;
      this.prev = null;
    }
  }

  class Deque {
    constructor() {
      this.storage = [];

      this.head = null;
      this.tail = null;

      this.length = 0;
    }

    push_front(value) {
      const newNode = new Node(value);

      if (this.empty()) {
        this.head = newNode;
        this.tail = newNode;

        this.storage.unshift(value);
      } else {
        newNode.next = this.head;
        this.head.prev = newNode;
        this.head = newNode;

        this.storage.unshift(value);
      }

      this.length++;
    }

    push_back(value) {
      const newNode = new Node(value);

      if (this.empty()) {
        this.head = newNode;
        this.tail = newNode;

        this.storage.push(value);
      } else {
        newNode.prev = this.tail;
        this.tail.next = newNode;
        this.tail = newNode;

        this.storage.push(value);
      }

      this.length++;
    }

    pop_front() {
      if (this.empty()) {
        return -1;
      } else {
        const popNode = this.head;

        this.head.prev = null;
        this.head = popNode.next;

        this.storage.shift();
        this.length--;

        return popNode.value;
      }
    }

    pop_back() {
      if (this.empty()) {
        return -1;
      } else {
        const popNode = this.tail;

        this.tail.next = null;
        this.tail = popNode.prev;

        this.storage.pop();
        this.length--;

        return popNode.value;
      }
    }

    size() {
      return this.length;
    }

    empty() {
      return this.length === 0 ? 1 : 0;
    }

    front() {
      return this.head !== null ? this.head.value : -1;
    }

    back() {
      return this.tail !== null ? this.tail.value : -1;
    }
  }

  const deque = new Deque();
  let result = '';

  input.forEach((line) => {
    const method = line.split(' ');

    switch (method[0]) {
      case 'push_front':
        deque.push_front(method[1]);
        break;
      case 'push_back':
        deque.push_back(method[1]);
        break;
      case 'pop_front':
        result += deque.pop_front() + '\n';
        break;
      case 'pop_back':
        result += deque.pop_back() + '\n';
        break;
      case 'size':
        result += deque.size() + '\n';
        break;
      case 'empty':
        result += deque.empty() + '\n';
        break;
      case 'front':
        result += deque.front() + '\n';
        break;
      case 'back':
        result += deque.back() + '\n';
        break;
      default:
        break;
    }
  });

  console.log(result);
  process.exit();
});
