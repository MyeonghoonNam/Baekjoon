const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `5 17`
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
  const [N, K] = input().split(" ").map(Number);
  const MAX_INDEX = 100001;
  const time = new Array(MAX_INDEX).fill(0);
  let result = 0;

  const bfs = () => {
    const queue = new Queue();
    queue.enqueue(N);

    while (!queue.isEmpty()) {
      const current = queue.dequeue();

      if (current === K) {
        result = time[current];
        return;
      }

      const move = [current - 1, current + 1, current * 2];

      for (let i = 0; i < move.length; i++) {
        const nextPosition = move[i];

        if (nextPosition < 0 || nextPosition >= MAX_INDEX) continue;

        if (time[nextPosition] === 0) {
          time[nextPosition] = time[current] + 1;
          queue.enqueue(nextPosition);
        }
      }
    }
  };

  bfs();

  return result;
};

console.log(solution());
