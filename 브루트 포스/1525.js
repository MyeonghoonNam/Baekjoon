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

  enqueue(value) {
    const newNode = new Node(value);

    if (this.length === 0) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }

    this.length++;
  }

  dequeue() {
    if (!this.head) {
      return null;
    }

    if (this.head === this.tail) {
      this.tail = null;
    }

    const pointer = this.head;

    this.head = this.head.next;
    this.length--;

    return pointer.value;
  }

  front() {
    return this.head.value;
  }
}

const fs = require('fs');
const stdin = (
  process.platform === 'linux'
    ? fs.readFileSync('/dev/stdin').toString()
    : `3 6 0
8 1 2
7 4 5`
).split('\n');

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const endStr = '123456780';
  const arrayStr = arrayToString();
  const result = bfs(arrayStr, endStr);

  return result;
};

const arrayToString = () => {
  let arrayStr = '';

  for (let i = 0; i < 3; i++) {
    arrayStr += input().split(' ').join('');
  }

  return arrayStr;
};

const bfs = (arrayStr, endStr) => {
  const queue = new Queue();
  const set = new Set();

  queue.enqueue([arrayStr, 0]);

  while (queue.length > 0) {
    let [curStr, count] = queue.dequeue();

    set.add(curStr);

    if (curStr === endStr) {
      return count;
    }

    const idx = curStr.indexOf('0');
    const x = Math.floor(idx / 3);
    const y = Math.floor(idx % 3);
    const dx = [-1, 1, 0, 0];
    const dy = [0, 0, -1, 1];

    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];

      if (checkMapRange(nx, ny)) {
        let temp = curStr.split('');

        [temp[x * 3 + y], temp[nx * 3 + ny]] = [
          temp[nx * 3 + ny],
          temp[x * 3 + y],
        ];

        temp = temp.join('');

        if (!set.has(temp)) {
          set.add(temp);
          queue.enqueue([temp, count + 1]);
        }
      }
    }
  }

  return -1;
};

const checkMapRange = (x, y) => {
  if (x >= 0 && x < 3 && y >= 0 && y < 3) return true;
  else return false;
};

console.log(solution());
