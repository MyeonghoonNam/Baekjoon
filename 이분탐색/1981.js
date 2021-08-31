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
    : `5
1 1 3 6 8
1 2 2 5 5
4 4 0 3 3
8 0 2 3 4
4 3 0 2 1`
).split('\n');

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const N = Number(input());
  const map = new Array(N);
  let visited = [];

  let maxValue = Number.MIN_SAFE_INTEGER;
  let minValue = Number.MAX_SAFE_INTEGER;
  let result = Number.MAX_SAFE_INTEGER;

  const dx = [0, 0, -1, 1];
  const dy = [-1, 1, 0, 0];

  for (let i = 0; i < N; i++) {
    map[i] = input().split(' ').map(Number);
  }

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (map[i][j] > maxValue) maxValue = map[i][j];
      if (map[i][j] < minValue) minValue = map[i][j];
    }
  }

  const bfs = (diff) => {
    const queue = new Queue();

    for (let i = minValue; i <= maxValue; i++) {
      visited = Array.from(new Array(N), () => new Array(N).fill(true));

      for (let j = 0; j < N; j++) {
        for (let k = 0; k < N; k++) {
          if (i <= map[j][k] && map[j][k] <= i + diff) {
            visited[j][k] = false;
          }
        }
      }

      queue.enqueue([0, 0]);

      while (queue.length > 0) {
        const [x, y] = queue.dequeue();

        if (visited[x][y]) continue;

        visited[x][y] = true;

        if (x === N - 1 && y === N - 1) return true;

        for (let i = 0; i < 4; i++) {
          const nx = x + dx[i];
          const ny = y + dy[i];

          if (checkRange(nx, ny)) {
            queue.enqueue([nx, ny]);
          }
        }
      }
    }
  };

  const checkRange = (x, y) => {
    if (x >= 0 && x < N && y >= 0 && y < N) return true;
    else return false;
  };

  let low = 0;
  let high = maxValue - minValue;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);

    if (bfs(mid)) {
      if (result > mid) {
        result = mid;
      }

      high = mid - 1;
    } else {
      low = mid + 1;
    }
  }

  return result;
};

console.log(solution());
