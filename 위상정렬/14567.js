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
    this.head = this.head.next;

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
    : `6 4
1 2
1 3
2 5
4 5`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const [N, M] = input().split(" ").map(Number);
  const graph = Array.from(new Array(N + 1), () => new Array());
  const indegree = new Array(N + 1).fill(0);
  const result = new Array(N + 1);

  for (let i = 0; i < M; i++) {
    const [start, end] = input().split(" ").map(Number);
    graph[start].push(end);
    indegree[end] += 1;
  }

  const queue = new Queue();
  for (let i = 1; i <= N; i++) {
    if (indegree[i] === 0) {
      queue.enqueue(i);
      result[i] = 1;
    }
  }

  while (!queue.isEmpty()) {
    const node = queue.dequeue();

    graph[node].forEach((v) => {
      indegree[v] -= 1;
      result[v] = result[node] + 1;

      if (indegree[v] === 0) {
        queue.enqueue(v);
      }
    });
  }

  return result.slice(1).join(" ");
};

console.log(solution());
