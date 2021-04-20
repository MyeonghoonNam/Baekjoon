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
      this.storage.push(value);
      this.length++;
    }
    pop_front() {
      this.length--;
      return this.storage.shift();
    }
    pop_back() {
      this.length--;
      return this.storage.pop();
    }
    size() {
      return this.length;
    }
  }

  const [N, M] = input[0].split(' ').map((el) => parseInt(el));
  const idx = input[1].split(' ').map((el) => parseInt(el));

  const deque = new Deque();
  for (let i = 1; i <= N; i++) {
    deque.push_back(i);
  }

  let count = 0;
  for (let j = 0; j < M; j++) {
    const targetIdx = deque.storage.indexOf(idx[j]);

    let harfIdx = 0;
    if (deque.size() % 2 === 0) {
      harfIdx = parseInt(deque.size() / 2) - 1;
    } else {
      harfIdx = parseInt(deque.size() / 2);
    }

    if (targetIdx <= harfIdx) {
      for (let k = 0; k < targetIdx; k++) {
        const temp = deque.pop_front();

        deque.push_back(temp);
        count++;
      }
    } else {
      for (let k = 0; k < deque.size() - targetIdx; k++) {
        const temp = deque.pop_back();

        deque.push_front(temp);
        count++;
      }
    }

    deque.pop_front();
  }
  console.log(count);
  process.exit();
});
