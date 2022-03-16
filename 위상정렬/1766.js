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

class MinHeap {
  constructor() {
    this.heap = [];
    this.heapSize = 0;
  }

  insert(value) {
    this.heap.push(value);
    this.heapSize++;
    this.moveUp();
  }

  pop() {
    if (this.heapSize === 0) return;
    if (this.heapSize === 1) {
      this.heapSize--;
      return this.heap.pop();
    }

    const popValue = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapSize--;
    this.moveDown();

    return popValue;
  }

  moveUp() {
    let curIdx = this.heapSize - 1;

    while (curIdx > 0) {
      const parentIdx = Math.floor((curIdx - 1) / 2);

      if (this.heap[parentIdx] <= this.heap[curIdx]) break;

      [this.heap[parentIdx], this.heap[curIdx]] = [
        this.heap[curIdx],
        this.heap[parentIdx],
      ];
      curIdx = parentIdx;
    }
  }

  moveDown(curIdx = 0) {
    const leftChildIdx = curIdx * 2 + 1;
    const rightChildIdx = curIdx * 2 + 2;
    const leftChildValue = this.heap[leftChildIdx];
    const rightChildValue = this.heap[rightChildIdx];
    let minIdx = curIdx;
    const minValue = this.heap[minIdx];

    if (leftChildIdx < this.heapSize && leftChildValue < minValue) {
      minIdx = leftChildIdx;
    }

    if (rightChildIdx < this.heapSize && rightChildValue < minValue) {
      minIdx = rightChildIdx;
    }

    if (minIdx !== curIdx) {
      [this.heap[minIdx], this.heap[curIdx]] = [
        this.heap[curIdx],
        this.heap[minIdx],
      ];
      this.moveDown(minIdx);
    }
  }

  isEmpty() {
    return this.heapSize === 0 ? true : false;
  }
}

const solution = () => {
  const [N, M] = input().split(" ").map(Number);
  const graph = Array.from(new Array(N + 1), () => new Array());
  const indegree = new Array(N + 1).fill(0);

  for (let i = 0; i < M; i++) {
    const [start, end] = input().split(" ").map(Number);
    graph[start].push(end);
    indegree[end] += 1;
  }

  const topology = () => {
    const queue = new MinHeap();
    const result = [];

    for (let i = 1; i <= N; i++) {
      if (indegree[i] === 0) {
        queue.insert(i);
      }
    }

    while (!queue.isEmpty()) {
      const node = queue.pop();
      result.push(node);

      graph[node].forEach((destination) => {
        indegree[destination] -= 1;

        if (indegree[destination] === 0) {
          queue.insert(destination);
        }
      });
    }

    return result.join(" ");
  };

  const result = topology();

  return result;
};

console.log(solution());
