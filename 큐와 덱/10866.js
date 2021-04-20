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
  // 덱 구현
  class Deque {
    constructor() {
      this.storage = [];
      this.length = 0;
    }

    push_front(value) {
      this.storage.unshift(value);
      this.length++;
    }

    push_back(value) {
      this.storage[this.length] = value;
      this.length++;
    }

    pop_front() {
      if (this.empty() === 0) {
        this.length--;
        return this.storage.shift();
      }
      return -1;
    }

    pop_back() {
      if (this.empty() === 0) {
        this.length--;
        return this.storage.pop();
      }
      return -1;
    }

    size() {
      return this.length;
    }

    empty() {
      return this.length === 0 ? 1 : 0;
    }

    front() {
      if (this.empty() === 0) {
        return this.storage[0];
      }

      return -1;
    }

    back() {
      if (this.empty() === 0) {
        return this.storage[this.length - 1];
      }

      return -1;
    }
  }

  const deque = new Deque();
  let result = '';

  input.forEach((str) => {
    const method = str.split(' ');
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
