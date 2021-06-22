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
    if (this.heap.length === 1) return this.heap.pop();

    const max = this.heap[0];

    this.heap[0] = this.heap.pop();
    this.moveDown(0);

    return max;
  }

  moveUp() {
    if (this.heap.length === 1) return;

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
    return this.heap.length ? false : true;
  }
}

const fs = require('fs');
const stdin = (
  process.platform === 'linux'
    ? fs.readFileSync('/dev/stdin').toString()
    : `7
20 1
2 1
10 3
100 2
8 2
5 20
50 10`
).split('\n');

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

console.log(Solution());

function Solution() {
  const N = Number(input());
  const lectures = [];

  for (let i = 0; i < N; i++) {
    lectures[i] = input().split(' ').map(Number);
  }

  lectures.sort((a, b) => {
    return b[1] - a[1];
  });

  const heap = new MaxHeap();

  let result = 0;
  let idx = 0;

  for (let i = 10000; i >= 1; i--) {
    while (idx < N && i <= lectures[idx][1]) {
      heap.insert(lectures[idx++][0]);
    }

    if (!heap.empty()) {
      result += heap.pop();
    }
  }

  return result;
}
