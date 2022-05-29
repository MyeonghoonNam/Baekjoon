class MinHeap {
  constructor() {
    this.heap = [];
    this.size = 0;
  }

  insert(value) {
    this.heap.push(value);
    this.size++;
    this.moveUp();
  }

  pop() {
    if (this.size === 0) return;
    if (this.size === 1) {
      this.size--;
      return this.heap.pop();
    }

    const pop_node = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.size--;
    this.moveDown();

    return pop_node;
  }

  moveUp() {
    let current_idx = this.size - 1;

    while (current_idx > 0) {
      const parent_idx = parseInt((current_idx - 1) / 2);

      if (this.heap[parent_idx] <= this.heap[current_idx]) break;

      this.swap(current_idx, parent_idx);
      current_idx = parent_idx;
    }
  }

  moveDown(current_idx = 0) {
    const leftChild_idx = parseInt(current_idx * 2 + 1);
    const rightChild_idx = parseInt(current_idx * 2 + 2);
    let min_idx = current_idx;

    if (
      leftChild_idx < this.size &&
      this.heap[leftChild_idx] < this.heap[current_idx]
    ) {
      min_idx = leftChild_idx;
    }

    if (
      rightChild_idx < this.size &&
      this.heap[rightChild_idx] < this.heap[current_idx]
    ) {
      min_idx = rightChild_idx;
    }

    if (min_idx !== current_idx) {
      this.swap(current_idx, min_idx);
      this.moveDown(min_idx);
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

const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `5
8
1 2 2
1 3 3
1 4 1
1 5 10
2 4 2
3 4 1
3 5 1
4 5 3
1 5`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

/**
 * N개의 도시, M개의 버스(한 도시에서 출발하여 다른 도시에 도착)
 * 도시의 번호는 1 부터 N
 *
 * 요구사항: A에서 B 도시까지 가는데 드는 쵯호 비용 도출
 */
const solution = () => {
  const N = Number(input());
  const M = Number(input());
  const graph = Array.from(new Array(N + 1), () => new Array());
  const distance = new Array(N + 1).fill(Infinity);

  for (let i = 0; i < M; i++) {
    const [start, end, cost] = input().split(" ").map(Number);
    graph[start].push({ node: end, cost });
  }

  const dijkstra = (start, end) => {
    const queue = new MinHeap();
    queue.insert({ node: start, cost: 0 });
    distance[start] = 0;

    while (!queue.isEmpty()) {
      const { node, cost: current_cost } = queue.pop();

      if (distance[node] < current_cost) continue;

      graph[node].forEach(({ node: destination, cost: dist }) => {
        const total_cost = current_cost + dist;

        if (total_cost < distance[destination]) {
          distance[destination] = total_cost;
          queue.insert({ node: destination, cost: total_cost });
        }
      });
    }

    return distance[end];
  };

  const [start, end] = input().split(" ").map(Number);
  const result = dijkstra(start, end);

  return result;
};

console.log(solution());
