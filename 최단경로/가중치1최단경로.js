const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `3
DRD`
).split("\n");

// `3 DRD`
// `5 LLLLLLLL`

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
  const N = Number(input());
  const PATH = input();
  const DIRECTION_MAP = {
    L: [0, -1],
    R: [0, 1],
    U: [-1, 0],
    D: [1, 0],
  };

  let [x, y] = [0, 0];

  const dx = [-1, 1, 0, 0];
  const dy = [0, 0, -1, 1];

  const visited = Array.from(new Array(N + 1), () =>
    new Array(N + 1).fill(false)
  );

  const checkMapRange = (x, y) => {
    if (x < 0 || y < 0 || x > N || y > N) return false;
    else return true;
  };

  const bfs = (x, y) => {
    const queue = new Queue();
    queue.enqueue([x, y, 0]);
    visited[x][y] = true;

    let result = 0;

    while (!queue.isEmpty()) {
      const [x, y, distance] = queue.dequeue();

      if (x === N && y === N) {
        result += 1;
        continue;
      }

      for (let i = 0; i < 4; i++) {
        const nx = x + dx[i];
        const ny = y + dy[i];

        if (!checkMapRange(nx, ny) || visited[nx][ny]) continue;

        queue.enqueue([nx, ny, distance + 1]);
        visited[nx][ny] = true;
      }
    }

    return result;
  };

  // 특정 위치로 먼저 이동 후 특정 위치에서의 최단 경로
  for (let i = 0; i < PATH.length; i++) {
    const [mx, my] = DIRECTION_MAP[PATH[i]];
    const nx = x + mx;
    const ny = y + my;

    if (!checkMapRange(nx, ny)) return -1;

    x += mx;
    y += my;
  }

  const result = bfs(x, y);

  return result;
};

console.log(solution());
