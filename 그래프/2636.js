const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `13 12
0 0 0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 1 1 0 0 0
0 1 1 1 0 0 0 1 1 0 0 0
0 1 1 1 1 1 1 0 0 0 0 0
0 1 1 1 1 1 0 1 1 0 0 0
0 1 1 1 1 0 0 1 1 0 0 0
0 0 1 1 0 0 0 1 1 0 0 0
0 0 1 1 1 1 1 1 1 0 0 0
0 0 1 1 1 1 1 1 1 0 0 0
0 0 1 1 1 1 1 1 1 0 0 0
0 0 1 1 1 1 1 1 1 0 0 0
0 0 0 0 0 0 0 0 0 0 0 0`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.head = this.tail = null;
    this.size = 0;
  }

  enqueue(value) {
    const newNode = new Node(value);

    if (this.isEmpty()) {
      this.head = this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }

    this.size++;
  }

  dequeue() {
    if (this.isEmpty()) return;

    const popNode = this.head;
    this.head = popNode.next;

    if (this.size === 1) {
      this.tail = this.head;
    }

    this.size--;

    return popNode.value;
  }

  isEmpty() {
    return this.size === 0 ? true : false;
  }
}

const solution = () => {
  const [N, M] = input().split(" ").map(Number);
  const map = [];
  let visited = [];
  const dx = [-1, 1, 0, 0];
  const dy = [0, 0, -1, 1];
  let cheeseCount = 0;
  let time = 1;

  for (let i = 0; i < N; i++) {
    const row = input().split(" ").map(Number);

    for (let j = 0; j < M; j++) {
      if (row[j] === 1) {
        cheeseCount += 1;
      }
    }

    map.push(row);
  }

  const bfs = () => {
    const queue = new Queue();
    queue.enqueue([0, 0]);
    visited[0][0] = true;

    const meltCheesesPosition = [];

    while (!queue.isEmpty()) {
      const [x, y] = queue.dequeue();

      for (let i = 0; i < 4; i++) {
        const nx = x + dx[i];
        const ny = y + dy[i];

        if (!checkMapRange(nx, ny) || visited[nx][ny] === true) continue;

        if (map[nx][ny] === 0) {
          queue.enqueue([nx, ny]);
        } else if (map[nx][ny] === 1) {
          meltCheesesPosition.push([nx, ny]);
        }

        visited[nx][ny] = true;
      }
    }

    for (let i = 0; i < meltCheesesPosition.length; i++) {
      const [x, y] = meltCheesesPosition[i];

      map[x][y] = 0;
    }

    return meltCheesesPosition.length;
  };

  const checkMapRange = (x, y) => {
    if (x < 0 || y < 0 || x >= N || y >= M) return false;
    else return true;
  };

  while (true) {
    visited = Array.from(new Array(N), () => new Array(M).fill(false));
    const meltCheeseCount = bfs();
    cheeseCount -= meltCheeseCount;

    if (cheeseCount === 0) {
      return `${time}\n${meltCheeseCount}`;
    }

    time += 1;
  }
};

console.log(solution());
