const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `3 1
3 2 6`
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
    this.heap.push(BigInt(value));
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
    let currentIndex = this.heapSize - 1;

    while (currentIndex > 0) {
      const parentIndex = parseInt((currentIndex - 1) / 2);

      if (this.heap[parentIndex] <= this.heap[currentIndex]) break;

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
      this.heap[leftChildIndex] < this.heap[minValueIndex]
    ) {
      minValueIndex = leftChildIndex;
    }

    if (
      rightChildIndex < this.heapSize &&
      this.heap[rightChildIndex] < this.heap[minValueIndex]
    ) {
      minValueIndex = rightChildIndex;
    }

    if (minValueIndex !== currentIndex) {
      this.swap(minValueIndex, currentIndex);
      this.moveDown(minValueIndex);
    }
  }

  isEmpty() {
    return this.heapSize === 0 ? true : false;
  }

  swap(a, b) {
    let temp = this.heap[a];
    this.heap[a] = this.heap[b];
    this.heap[b] = temp;
  }
}

const solution = () => {
  const [N, M] = input().split(" ").map(Number);
  const cards = input().split(" ").map(Number);
  const priorityQueue = new MinHeap();

  for (let i = 0; i < N; i++) {
    priorityQueue.insert(cards[i]);
  }

  for (let i = 0; i < M; i++) {
    const firstCard = priorityQueue.pop();
    const secondCard = priorityQueue.pop();
    const sum = firstCard + secondCard;

    priorityQueue.insert(sum);
    priorityQueue.insert(sum);
  }

  let result = 0n;
  while (!priorityQueue.isEmpty()) {
    result += priorityQueue.pop();
  }

  return result.toString();
};

console.log(solution());
