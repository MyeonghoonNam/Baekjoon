'use strict';

class MaxHeap {
  constructor() {
    this.heap = [];
  }

  insert(value) {
    this.heap.push(value);
    this.moveUp();
  }

  pop() {
    if (this.heap.length === 1) {
      return this.heap.pop();
    }

    const max = this.heap[0];

    this.heap[0] = this.heap.pop();
    this.moveDown(0);

    return max;
  }

  moveUp() {
    let curIdx = this.heap.length - 1;

    while (curIdx > 0) {
      const parentIdx = Math.floor((curIdx - 1) / 2);

      if (this.heap[parentIdx] >= this.heap[curIdx]) break;

      [this.heap[parentIdx], this.heap[curIdx]] = [
        this.heap[curIdx],
        this.heap[parentIdx],
      ];

      curIdx = parentIdx;
    }
  }

  moveDown(idx) {
    const leftIdx = 2 * idx + 1;
    const rightIdx = 2 * idx + 2;
    const length = this.heap.length;
    let maxIdx = idx;

    if (leftIdx < length && this.heap[leftIdx] > this.heap[maxIdx]) {
      maxIdx = leftIdx;
    }

    if (rightIdx < length && this.heap[rightIdx] > this.heap[maxIdx]) {
      maxIdx = rightIdx;
    }

    if (maxIdx !== idx) {
      [this.heap[idx], this.heap[maxIdx]] = [this.heap[maxIdx], this.heap[idx]];

      this.moveDown(maxIdx);
    }
  }

  empty() {
    return this.heap.length > 0 ? false : true;
  }
}

const fs = require('fs');
const stdin = (
  process.platform === 'linux'
    ? fs.readFileSync('/dev/stdin').toString()
    : `4 3
2 400
5 200
3 67
4 30
3
6
5`
).split('\n');

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

function Solution() {
  const [N, K] = input().split(' ').map(Number);
  const jewels = [];
  const bags = [];

  for (let i = 0; i < N; i++) {
    jewels[i] = input().split(' ').map(Number);
  }

  for (let i = 0; i < K; i++) {
    bags[i] = Number(input());
  }

  jewels.sort((a, b) => {
    return a[0] - b[0];
  });

  bags.sort((a, b) => {
    return a - b;
  });

  const heap = new MaxHeap();

  let result = 0;
  let idx = 0;
  for (let i = 0; i < K; i++) {
    while (idx < N && jewels[idx][0] <= bags[i]) {
      heap.insert(jewels[idx++][1]);
    }

    if (!heap.empty()) {
      result += heap.pop();
    }
  }

  return result;
}

console.log(Solution());
