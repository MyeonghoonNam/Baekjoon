const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const input = [];
rl.on('line', (line) => {
  // 입력 관리
  input.push(line.split(' ').map((el) => parseInt(el)));
}).on('close', () => {
  // 구현
  class Queue {
    constructor() {
      this.store = [];
    }

    enqueue(value) {
      this.store.push(value);
    }

    dequeue() {
      return this.store.shift();
    }

    front() {
      return this.store[0];
    }
  }

  const T = input[0][0];

  for (let i = 1; i < T * 2; i += 2) {
    const N = input[i][0];
    const M = input[i][1];
    const priority = input[i + 1];

    const queue = new Queue();

    for (let j = 0; j < N; j++) {
      queue.enqueue([j, priority[j]]);
    }

    let count = 0;
    let flag = true;
    while (flag) {
      let max = 0;
      for (let i = 0; i < queue.store.length; i++) {
        let maxTemp = queue.store[i][1];

        if (max < maxTemp) {
          max = maxTemp;
        }
      }

      while (1) {
        let queueTemp = queue.front();

        if (queueTemp[1] === max) {
          count++;

          queue.dequeue();

          if (queueTemp[0] === M) {
            console.log(count);

            flag = false;
          }

          break;
        } else {
          queue.enqueue(queueTemp);
          queue.dequeue();
        }
      }
    }
  }

  process.exit();
});
