const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `9
0
12345678
1
2
0
0
0
0
32`
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
    if (this.heapSize === 0) return 0;
    if (this.heapSize === 1) {
      this.heapSize--;
      return this.heap.pop();
    }

    const minValue = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapSize--;
    this.moveDown();

    return minValue;
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
    const leftIdx = curIdx * 2 + 1;
    const rightIdx = curIdx * 2 + 2;
    let minIdx = curIdx;

    if (leftIdx < this.heapSize && this.heap[leftIdx] < this.heap[minIdx]) {
      minIdx = leftIdx;
    }

    if (rightIdx < this.heapSize && this.heap[rightIdx] < this.heap[minIdx]) {
      minIdx = rightIdx;
    }

    if (minIdx !== curIdx) {
      [this.heap[minIdx], this.heap[curIdx]] = [
        this.heap[curIdx],
        this.heap[minIdx],
      ];
      this.moveDown(minIdx);
    }
  }
}

const solution = () => {
  const N = Number(input());
  const minHeap = new MinHeap();
  const result = [];

  for (let i = 0; i < N; i++) {
    const value = Number(input());

    if (value === 0) {
      const minValue = minHeap.pop();
      result.push(minValue);
    } else {
      minHeap.insert(value);
    }
  }

  return result.join("\n");
};

console.log(solution());
