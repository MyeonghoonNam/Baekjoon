class PriorityQueue {
  constructor() {
    this.heap = [];
    this.heap_size = 0;
  }

  insert(value) {
    this.heap.push(value);
    this.heap_size += 1;
    this.moveUp();
  }

  pop() {
    if (this.heap_size === 1) {
      this.heap_size -= 1;
      return this.heap.pop();
    }

    const popValue = this.heap[0];
    this.heap_size -= 1;
    this.moveDown();

    return popValue;
  }

  moveUp() {
    let current_idx = this.heap.length - 1;

    while (current_idx > 0) {
      const parent_idx = Math.floor((current_idx - 1) / 2);

      if (this.heap[parent_idx] <= this.heap[current_idx]) break;

      this.swap(current_idx, parent_idx);
      current_idx = parent_idx;
    }
  }

  moveDown(current_idx = 0) {
    const leftChild_idx = current_idx * 2 + 1;
    const rightChild_idx = current_idx * 2 + 2;
    let min_idx = this.heap[current_idx];

    if (
      leftChild_idx < this.heap_size &&
      this.heap[leftChild_idx] < this.heap[min_idx]
    ) {
      min_idx = leftChild_idx;
    }

    if (
      rightChild_idx < this.heap_size &&
      this.heap[rightChild_idx] < this.heap[min_idx]
    ) {
      min_idx = rightChild_idx;
    }

    if (min_idx !== current_idx) {
      this.swap(min_idx, current_idx);
      this.moveDown(min_idx);
    }
  }

  size() {
    return this.heap_size;
  }

  swap(a, b) {
    const temp = this.heap[a];
    this.heap[a] = this.heap[b];
    this.heap[b] = temp;
  }

  top() {
    return this.heap[0];
  }
}

const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `3
1 3
2 4
3 5`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const N = Number(input());
  const class_info = [];

  for (let i = 0; i < N; i++) {
    const [start_time, end_time] = input().split(" ").map(Number);
    class_info.push({ start_time, end_time });
  }

  class_info.sort((a, b) =>
    a.start_time === b.start_time
      ? a.start_time - b.start_time
      : a.end_time - b.end_time
  );

  const room = new PriorityQueue();
  room.insert(class_info[0].end_time);

  for (let i = 1; i < N; i++) {
    room.insert(class_info[i].end_time);

    if (room.top() <= class_info[i].start_time) {
      room.pop();
    }
  }

  const result = room.size();
  return result;
};

console.log(solution());
