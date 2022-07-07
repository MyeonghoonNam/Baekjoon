const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `6 6
001111
010000
001111
110001
011010
100010`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();
class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
    this.prev = null;
  }
}

class Deque {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  push_front(value) {
    const new_node = new Node(value);

    if (this.empty()) {
      this.head = this.tail = new_node;
    } else {
      new_node.next = this.head;
      this.head.prev = new_node;
      this.head = new_node;
    }

    this.length++;
  }

  push_back(value) {
    const new_node = new Node(value);

    if (this.empty()) {
      this.head = this.tail = new_node;
    } else {
      new_node.prev = this.tail;
      this.tail.next = new_node;
      this.tail = new_node;
    }

    this.length++;
  }

  pop_front() {
    if (this.empty()) return -1;

    const pop_node = this.head;

    if (this.size() === 1) {
      this.head = this.tail = null;
    } else {
      this.head = pop_node.next;
      this.head.prev = null;
    }

    this.length--;
    return pop_node.value;
  }

  pop_back() {
    if (this.empty()) return -1;

    const pop_node = this.tail;

    if (this.size() === 1) {
      this.head = this.tail = null;
    } else {
      this.tail = pop_node.prev;
      this.tail.next = null;
    }

    this.length--;
    return pop_node.value;
  }

  size() {
    return this.length;
  }

  empty() {
    return this.size() === 0 ? true : false;
  }
}

const solution = () => {
  const [M, N] = input().split(" ").map(Number);
  const map = [];
  const visited = Array.from(new Array(N), () => new Array(M).fill(0));

  for (let i = 0; i < N; i++) {
    const row = input().split("").map(Number);
    map.push(row);
  }

  const checkMapRange = (x, y) => {
    if (x >= 0 && y >= 0 && x < N && y < M) return true;
    else return false;
  };

  const bfs = () => {
    const queue = new Deque();

    queue.push_front([0, 0, 0]);
    visited[0][0] = 1;

    const dx = [-1, 1, 0, 0];
    const dy = [0, 0, -1, 1];

    while (!queue.empty()) {
      const [x, y, dist] = queue.pop_front();

      if (x === N - 1 && y === M - 1) {
        return dist;
      }

      for (let i = 0; i < 4; i++) {
        const nx = x + dx[i];
        const ny = y + dy[i];

        if (!checkMapRange(nx, ny)) continue;

        if (!visited[nx][ny]) {
          if (map[nx][ny] === 0) {
            queue.push_front([nx, ny, dist]);
          } else {
            queue.push_back([nx, ny, dist + 1]);
          }

          visited[nx][ny] = 1;
        }
      }
    }
  };

  const result = bfs();
  return result;
};

console.log(solution());
