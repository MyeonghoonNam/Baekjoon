const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `3
8
0 0
7 0
100
0 0
30 50
10
1 1
1 1`
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

    this.size += 1;
  }

  dequeue() {
    if (this.isEmpty()) return;

    const popNode = this.head;
    this.head = popNode.next;

    if (this.size === 1) {
      this.tail = this.head;
    }

    this.size -= 1;

    return popNode.value;
  }

  isEmpty() {
    return this.size === 0 ? true : false;
  }
}

const solution = () => {
  const result = [];
  let T = Number(input());

  while (T--) {
    const L = Number(input());
    const [cx, cy] = input().split(" ").map(Number);
    const [tx, ty] = input().split(" ").map(Number);
    const visited = Array.from(new Array(L), () => new Array(L).fill(false));
    const dx = [-2, -2, -1, 1, 2, 2, 1, -1];
    const dy = [-1, 1, 2, 2, 1, -1, -2, -2];

    const bfs = () => {
      const queue = new Queue();

      queue.enqueue([cx, cy, 0]);
      visited[cx][cy] = true;

      while (!queue.isEmpty()) {
        const [x, y, cost] = queue.dequeue();

        if (x === tx && y === ty) {
          result.push(cost);
          return;
        }

        for (let i = 0; i < 8; i++) {
          const nx = x + dx[i];
          const ny = y + dy[i];

          if (!checkMapRange(nx, ny)) continue;

          if (!visited[nx][ny]) {
            queue.enqueue([nx, ny, cost + 1]);
            visited[nx][ny] = true;
          }
        }
      }
    };

    const checkMapRange = (x, y) => {
      if (x >= 0 && y >= 0 && x < L && y < L) return true;
      else return false;
    };

    bfs();
  }

  return result.join("\n");
};

console.log(solution());
