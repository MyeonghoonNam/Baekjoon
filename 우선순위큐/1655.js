const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `7
1
5
2
10
-99
7
5`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

class MinHeap {
  constructor() {
    this.heap = [];
  }

  push(value) {
    this.heap.push(value);
    this.moveUp();
  }

  moveUp() {
    let currentIndex = this.heap.length - 1;

    while (currentIndex > 0) {
      const parentIndex = parseInt((currentIndex - 1) / 2);
      if (this.heap[parentIndex] <= this.heap[currentIndex]) break;

      this.swap(currentIndex, parentIndex);
      currentIndex = parentIndex;
    }
  }

  pop() {
    if (this.heap.length === 0) return;
    if (this.heap.length === 1) return this.heap.pop();

    const popValue = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.moveDown();

    return popValue;
  }

  moveDown(currentIndex = 0) {
    const leftChildIndex = currentIndex * 2 + 1;
    const rightChildIndex = currentIndex * 2 + 2;
    let minIndex = currentIndex;

    if (
      leftChildIndex < this.heap.length &&
      this.heap[leftChildIndex] < this.heap[minIndex]
    ) {
      minIndex = leftChildIndex;
    }

    if (
      rightChildIndex < this.heap.length &&
      this.heap[rightChildIndex] < this.heap[minIndex]
    ) {
      minIndex = rightChildIndex;
    }

    if (minIndex !== currentIndex) {
      this.swap(minIndex, currentIndex);
      this.moveDown(minIndex);
    }
  }

  swap(a, b) {
    [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]];
  }

  top() {
    return this.heap[0];
  }

  isEmpty() {
    return this.heap.length === 0 ? true : false;
  }

  size() {
    return this.heap.length;
  }
}

class MaxHeap {
  constructor() {
    this.heap = [];
  }

  push(value) {
    this.heap.push(value);
    this.moveUp();
  }

  moveUp() {
    let currentIndex = this.heap.length - 1;

    while (currentIndex > 0) {
      const parentIndex = parseInt((currentIndex - 1) / 2);
      if (this.heap[parentIndex] >= this.heap[currentIndex]) break;

      this.swap(currentIndex, parentIndex);
      currentIndex = parentIndex;
    }
  }

  pop() {
    if (this.heap.length === 0) return;
    if (this.heap.length === 1) return this.heap.pop();

    const popValue = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.moveDown();

    return popValue;
  }

  moveDown(currentIndex = 0) {
    const leftChildIndex = currentIndex * 2 + 1;
    const rightChildIndex = currentIndex * 2 + 2;
    let minIndex = currentIndex;

    if (
      leftChildIndex < this.heap.length &&
      this.heap[leftChildIndex] > this.heap[minIndex]
    ) {
      minIndex = leftChildIndex;
    }

    if (
      rightChildIndex < this.heap.length &&
      this.heap[rightChildIndex] > this.heap[minIndex]
    ) {
      minIndex = rightChildIndex;
    }

    if (minIndex !== currentIndex) {
      this.swap(minIndex, currentIndex);
      this.moveDown(minIndex);
    }
  }

  swap(a, b) {
    [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]];
  }

  top() {
    return this.heap[0];
  }

  isEmpty() {
    return this.heap.length === 0 ? true : false;
  }

  size() {
    return this.heap.length;
  }
}

/**
 * 우선순위큐를 2개 활용하여 최소, 최대값을 통한 중간값 도출
 */
const solution = () => {
  let N = Number(input());
  const maxHeap = new MaxHeap();
  const minHeap = new MinHeap();
  const result = [];

  while (N--) {
    const number = Number(input());

    if (maxHeap.size() === minHeap.size()) {
      maxHeap.push(number);
    } else {
      minHeap.push(number);
    }

    if (
      !maxHeap.isEmpty() &&
      !minHeap.isEmpty() &&
      maxHeap.top() > minHeap.top()
    ) {
      const maxValue = maxHeap.top();
      const minValue = minHeap.top();

      maxHeap.pop();
      minHeap.pop();
      maxHeap.push(minValue);
      minHeap.push(maxValue);
    }

    result.push(maxHeap.top());
  }

  return result.join("\n");
};

console.log(solution());
