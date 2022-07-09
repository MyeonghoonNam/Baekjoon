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
    const new_node = new Node(value);

    if (this.isEmpty()) {
      this.head = this.tail = new_node;
    } else {
      this.tail.next = new_node;
      this.tail = new_node;
    }

    this.size++;
  }

  dequeue() {
    if (this.isEmpty()) return;

    const pop_node = this.head;
    this.head = pop_node.next;

    if (this.size === 1) {
      this.tail = this.head;
    }

    this.size--;
    return pop_node.value;
  }

  isEmpty() {
    return this.size === 0 ? true : false;
  }
}

const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `7 7
1011111
1110001
1000001
1000001
1000001
1000001
1111111`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const [N, M] = input().split(" ").map(Number);
  const maze = [];
  const visited = Array.from(new Array(N), () => new Array(M).fill(false));

  for (let i = 0; i < N; i++) {
    const row = input().split("").map(Number);
    maze.push(row);
  }

  const dx = [-1, 1, 0, 0];
  const dy = [0, 0, -1, 1];

  const bfs = () => {
    const queue = new Queue();

    queue.enqueue({ x: 0, y: 0, move_count: 1 });
    visited[0][0] = true;

    while (!queue.isEmpty()) {
      const { x, y, move_count: value } = queue.dequeue();

      if (x === N - 1 && y === M - 1) {
        return value;
      }

      for (let i = 0; i < 4; i++) {
        const nx = x + dx[i];
        const ny = y + dy[i];

        if (!checkMapRange(nx, ny)) continue;

        if (maze[nx][ny] === 1 && !visited[nx][ny]) {
          queue.enqueue({ x: nx, y: ny, move_count: value + 1 });
          visited[nx][ny] = true;
        }
      }
    }
  };

  const checkMapRange = (x, y) => {
    if (x >= 0 && y >= 0 && x < N && y < M) return true;
    else return false;
  };

  const result = bfs();
  return result;
};

console.log(solution());
