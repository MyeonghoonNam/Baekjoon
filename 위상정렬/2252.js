const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `4 2
4 2
3 1`
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
    this.head = null;
    this.tail = null;
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

    if (this.size === 1) {
      this.head = this.tail = null;
    } else {
      this.head = popNode.next;
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
  const students = Array.from(new Array(N + 1), () => new Array());
  const indegree = new Array(N + 1).fill(0);

  for (let i = 0; i < M; i++) {
    const [start, end] = input().split(" ").map(Number);
    students[start].push(end);
    indegree[end] += 1;
  }

  const topology = () => {
    const result = [];
    const queue = new Queue();

    for (let i = 1; i <= N; i++) {
      if (indegree[i] === 0) {
        queue.enqueue(i);
      }
    }

    while (!queue.isEmpty()) {
      const node = queue.dequeue();
      result.push(node);

      students[node].forEach((student) => {
        indegree[student] -= 1;

        if (indegree[student] === 0) {
          queue.enqueue(student);
        }
      });
    }

    return result.join(" ");
  };

  const result = topology();

  return result;
};

console.log(solution());
