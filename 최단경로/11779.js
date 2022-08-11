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

    const popNode = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapSize--;
    this.moveDown();

    return popNode;
  }

  moveUp() {
    let currentIndex = this.heapSize - 1;

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
    let minValueIndex = currentIndex;

    if (
      leftChildIndex < this.heapSize &&
      this.heap[leftChildIndex].cost < this.heap[minValueIndex].cost
    ) {
      minValueIndex = leftChildIndex;
    }

    if (
      rightChildIndex < this.heapSize &&
      this.heap[rightChildIndex].cost < this.heap[minValueIndex].cost
    ) {
      minValueIndex = rightChildIndex;
    }

    if (minValueIndex !== currentIndex) {
      this.swap(minValueIndex, currentIndex);
      this.moveDown(minValueIndex);
    }
  }

  swap(a, b) {
    let temp = this.heap[a];
    this.heap[a] = this.heap[b];
    this.heap[b] = temp;
  }

  isEmpty() {
    return this.heapSize === 0 ? true : false;
  }
}

const solution = () => {
  const N = Number(input());
  const M = Number(input());
  const bus = Array.from(new Array(N + 1), () => new Array());
  const distance = new Array(N + 1).fill(Infinity);

  for (let i = 0; i < M; i++) {
    const [from, to, cost] = input().split(" ").map(Number);
    bus[from].push({ city: to, cost });
  }

  const [start, end] = input().split(" ").map(Number);
  const route = new Array(N);

  const dijkstra = (start) => {
    const queue = new MinHeap();
    queue.insert({ city: start, cost: 0 });
    distance[start] = 0;
    route[start] = 0;

    while (!queue.isEmpty()) {
      const { city, cost } = queue.pop();

      if (distance[city] < cost) continue;

      bus[city].forEach((destination) => {
        const totalCost = cost + destination.cost;

        if (distance[destination.city] > totalCost) {
          queue.insert({ city: destination.city, cost: totalCost });
          distance[destination.city] = totalCost;
          route[destination.city] = city;
        }
      });
    }
  };

  const getRoute = (end, route) => {
    const result = [];
    let city = end;

    while (city) {
      result.push(city);
      city = route[city];
    }

    return result.reverse();
  };

  dijkstra(start);

  const routePrint = getRoute(end, route);
  const result = `${distance[end]}\n${routePrint.length}\n${routePrint.join(
    " "
  )}`;

  return result;
};

console.log(solution());
