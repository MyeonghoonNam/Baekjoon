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
    }

    push_back(value) {
      this.storage.push(value);
    }

    pop_front() {
      return this.storage.shift();
    }

    pop_back() {
      return this.storage.pop();
    }

    size() {
      return this.storage.length;
    }

    empty() {
      return this.storage.length === 0 ? 1 : 0;
    }
  }

  const T = parseInt(input[0]);
  let print = '';
  for (let i = 1; i <= T * 3; i += 3) {
    const P = input[i];
    const N = parseInt(input[i + 1]);
    const INPUT_ARRAY = input[i + 2]
      .slice(1, input[i + 2].length - 1)
      .split(',');
    const deque = new Deque();
    let result = '';

    for (let i = 0; i < N; i++) {
      deque.push_back(INPUT_ARRAY[i]);
    }

    let flag = true; // 방향 상태 변수
    for (let i = 0; i < P.length; i++) {
      if (P[i] === 'R') {
        flag = !flag;
        continue;
      }

      if (flag) {
        if (deque.pop_front() === undefined) {
          result += 'error\n';
        }
      } else {
        if (deque.pop_back() === undefined) {
          result += 'error\n';
        }
      }
    }

    if (deque.size() > 0) {
      result += '[';
      if (flag) {
        result += deque.pop_front();

        while (!deque.empty()) {
          result += ',' + deque.pop_front();
        }
      } else {
        result += deque.pop_back();

        while (!deque.empty()) {
          result += ',' + deque.pop_back();
        }
      }
      result += ']\n';
    }

    print += result;
  }
  console.log(print);
  process.exit();
});
