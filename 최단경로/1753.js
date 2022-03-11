const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `5 6
1
5 1 1
1 2 2
1 3 3
2 3 4
2 4 5
3 4 6`
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
    if (this.isEmpty()) return;

    if (this.heapSize === 1) {
      this.heapSize--;
      return this.heap.pop();
    }

    const popNode = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapSize--;
    this.moveDown();

    return popNode;
  }

  moveUp() {
    let curIdx = this.heapSize - 1;

    while (curIdx > 0) {
      const parentIdx = Math.floor((curIdx - 1) / 2);

      if (this.heap[parentIdx].cost <= this.heap[curIdx].cost) break;

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
    const leftChildCost = this.heap[leftChildIdx]?.cost;
    const rightChildCost = this.heap[rightChildIdx]?.cost;
    let minIdx = curIdx;
    const minCost = this.heap[minIdx].cost;

    if (leftChildIdx < this.heapSize && leftChildCost < minCost) {
      minIdx = leftChildIdx;
    }

    if (rightChildIdx < this.heapSize && rightChildCost < minCost) {
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
  const [V, E] = input().split(" ").map(Number);
  const startNode = Number(input());
  const graph = Array.from(new Array(V + 1), () => new Array());
  const distance = new Array(V + 1).fill(Infinity);

  for (let i = 0; i < E; i++) {
    const [startPoint, destination, dist] = input().split(" ").map(Number);

    graph[startPoint].push({ destination, dist });
  }

  const dijkstra = (startNode) => {
    const queue = new MinHeap();
    queue.insert({ node: startNode, cost: 0 });
    distance[startNode] = 0;

    while (!queue.isEmpty()) {
      const { node, cost } = queue.pop();

      if (distance[node] < cost) continue;

      graph[node].forEach(({ destination, dist }) => {
        const totalCost = cost + dist;

        if (totalCost < distance[destination]) {
          queue.insert({ node: destination, cost: totalCost });
          distance[destination] = totalCost;
        }
      });
    }
  };

  dijkstra(startNode);

  const result = [];
  for (let i = 1; i <= V; i++) {
    const cost = distance[i];

    if (cost === Infinity) {
      result.push("INF");
    } else {
      result.push(cost);
    }
  }

  return result.join("\n");
};

console.log(solution());
