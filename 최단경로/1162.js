const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `4 4 1
1 2 10
2 4 10
1 3 1
3 4 100`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

class MinHeap {
  constructor() {
    this.heap = [];
    this.size = 0;
  }

  insert(value) {
    this.heap.push(value);
    this.size += 1;
    this.moveUp();
  }

  pop() {
    if (this.isEmpty()) return;

    if (this.size === 1) {
      this.size -= 1;
      return this.heap.pop();
    }

    const minValue = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.size -= 1;
    this.moveDown();

    return minValue;
  }

  moveUp() {
    let currentIndex = this.size - 1;

    while (currentIndex > 0) {
      const parentIndex = parseInt((currentIndex - 1) / 2);

      if (this.heap[parentIndex].cost <= this.heap[currentIndex].cost) break;

      this.swap(parentIndex, currentIndex);
      currentIndex = parentIndex;
    }
  }

  moveDown(currentIndex = 0) {
    const leftChildIndex = currentIndex * 2 + 1;
    const rightChildIndex = currentIndex * 2 + 2;
    let minIndex = currentIndex;

    while (
      leftChildIndex < this.size &&
      this.heap[leftChildIndex].cost < this.heap[minIndex].cost
    ) {
      minIndex = leftChildIndex;
    }

    while (
      rightChildIndex < this.size &&
      this.heap[rightChildIndex].cost < this.heap[minIndex].cost
    ) {
      minIndex = rightChildIndex;
    }

    if (minIndex !== currentIndex) {
      this.swap(minIndex, currentIndex);
      this.moveDown(minIndex);
    }
  }

  isEmpty() {
    return this.size === 0 ? true : false;
  }

  swap(a, b) {
    let temp = this.heap[a];
    this.heap[a] = this.heap[b];
    this.heap[b] = temp;
  }
}

const solution = () => {
  const [N, M, K] = input().split(" ").map(Number);
  const graph = Array.from(new Array(N + 1), () => []);
  const distance = Array.from(new Array(N + 1), () =>
    new Array(K + 1).fill(Infinity)
  );

  for (let i = 0; i < M; i++) {
    const [start, end, cost] = input().split(" ").map(Number);

    graph[start].push({ node: end, cost, pave: 0 });
    graph[end].push({ node: start, cost, pave: 0 });
  }

  const bfs = (start) => {
    const queue = new MinHeap();

    queue.insert({ node: start, cost: 0, pave: 0 });
    distance[start][0] = 0;

    while (!queue.isEmpty()) {
      const current = queue.pop();

      if (distance[current.node][current.pave] < current.cost) continue;

      for (let i = 0; i < graph[current.node].length; i++) {
        const next = graph[current.node][i];
        const totalCost = current.cost + next.cost;

        if (totalCost < distance[next.node][current.pave]) {
          queue.insert({
            node: next.node,
            cost: totalCost,
            pave: current.pave,
          });

          distance[next.node][current.pave] = totalCost;
        }

        if (
          current.pave < K &&
          current.cost < distance[next.node][current.pave + 1]
        ) {
          queue.insert({
            node: next.node,
            cost: current.cost,
            pave: current.pave + 1,
          });

          distance[next.node][current.pave + 1] = current.cost;
        }
      }
    }
  };

  bfs(1);

  let result = Infinity;

  for (let i = 0; i <= K; i++) {
    result = Math.min(result, distance[N][i]);
  }

  return result;
};

console.log(solution());
