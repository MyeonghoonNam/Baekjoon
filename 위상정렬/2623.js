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

    if (this.size === 0) {
      this.head = this.tail = new_node;
    } else {
      this.tail.next = new_node;
      this.tail = new_node;
    }

    this.size++;
  }

  dequeue() {
    if (this.size === 0) return;

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
    : `6 3
3 1 4 3
4 6 2 5 4
2 2 3`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const [N, M] = input().split(" ").map(Number);
  const graph = Array.from(new Array(N + 1), () => new Array());
  const indegree = new Array(N + 1).fill(0);
  const result = [];

  for (let i = 0; i < M; i++) {
    const data = input().split(" ").map(Number);
    const singer_count = data[0];
    const order = data.slice(1);

    for (let j = 0; j < singer_count - 1; j++) {
      const start = order[j];
      const end = order[j + 1];

      graph[start].push(end);
      indegree[end] += 1;
    }
  }

  const queue = new Queue();
  for (let i = 1; i <= N; i++) {
    if (indegree[i] === 0) queue.enqueue(i);
  }

  while (!queue.isEmpty()) {
    const value = queue.dequeue();
    result.push(value);

    graph[value].forEach((v) => {
      indegree[v] -= 1;

      if (indegree[v] === 0) queue.enqueue(v);
    });
  }

  if (result.length !== N) return 0;
  else return result.join("\n");
};

console.log(solution());
