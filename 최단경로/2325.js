const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `5 7
1 2 8
1 4 10
2 3 9
2 4 10
2 5 1
3 4 7
3 5 10`
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

    const popValue = this.head;
    this.head = popValue.next;

    if (this.size === 1) {
      this.tail = this.head;
    }

    this.size -= 1;

    return popValue.value;
  }

  isEmpty() {
    return this.size === 0 ? true : false;
  }
}

const solution = () => {
  const [N, M] = input().split(" ").map(Number);
  const graph = Array.from(new Array(N + 1), () => []);
  let distance = new Array(N + 1).fill(Infinity);
  const visited = new Array(N + 1).fill(false);

  for (let i = 0; i < M; i++) {
    const [start, end, cost] = input().split(" ").map(Number);

    graph[start].push({ node: end, cost });
    graph[end].push({ node: start, cost });
  }

  const dijkstra = (start = 0, end = 0) => {
    const queue = new MinHeap();

    queue.insert({ node: 1, cost: 0 });
    distance[1] = 0;

    while (!queue.isEmpty()) {
      const current = queue.pop();

      if (distance[current.node] < current.cost) continue;

      for (let i = 0; i < graph[current.node].length; i++) {
        const next = graph[current.node][i];

        if (current.node === start && next.node === end) continue;
        if (current.node === end && next.node === start) continue;

        const totalCost = distance[current.node] + next.cost;

        if (totalCost < distance[next.node]) {
          queue.insert({ node: next.node, cost: totalCost });
          distance[next.node] = totalCost;
        }
      }
    }
  };

  const bfs = () => {
    const queue = new Queue();
    const removeEdges = [];

    queue.enqueue({ node: N });
    visited[N] = true;

    while (!queue.isEmpty()) {
      const current = queue.dequeue();

      if (current.node === 1) continue;

      for (let i = 0; i < graph[current.node].length; i++) {
        const next = graph[current.node][i];

        if (distance[next.node] + next.cost === distance[current.node]) {
          removeEdges.push({ start: current.node, end: next.node });

          if (!visited[next.node]) {
            queue.enqueue({ node: next.node });
            visited[next.node] = true;
          }
        }
      }
    }

    return removeEdges;
  };

  dijkstra();

  const removeEdgeCombination = bfs();
  let result = Number.MIN_SAFE_INTEGER;

  for (let i = 0; i < removeEdgeCombination.length; i++) {
    distance = new Array(N + 1).fill(Infinity);

    const { start, end } = removeEdgeCombination[i];

    dijkstra(start, end);
    result = Math.max(result, distance[N]);
  }

  return result;
};

console.log(solution());
