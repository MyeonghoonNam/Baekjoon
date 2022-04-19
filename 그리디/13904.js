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
    if (this.heap_size === 0) return;
    if (this.heap_size === 1) {
      this.heap_size -= 1;
      return this.heap.pop();
    }

    const pop_value = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heap_size -= 1;
    this.moveDown();

    return pop_value;
  }

  moveUp() {
    let current_idx = this.heap.length - 1;

    while (current_idx > 0) {
      const parent_idx = Math.floor((current_idx - 1) / 2);

      if (this.heap[parent_idx] >= this.heap[current_idx]) break;

      this.swap(current_idx, parent_idx);
      current_idx = parent_idx;
    }
  }

  moveDown(current_idx = 0) {
    const left_child_idx = current_idx * 2 + 1;
    const right_child_idx = current_idx * 2 + 2;
    let min_idx = current_idx;

    if (
      left_child_idx < this.heap_size &&
      this.heap[left_child_idx] > this.heap[min_idx]
    ) {
      min_idx = left_child_idx;
    }

    if (
      right_child_idx < this.heap_size &&
      this.heap[right_child_idx] > this.heap[min_idx]
    ) {
      min_idx = right_child_idx;
    }

    if (min_idx !== current_idx) {
      this.swap(min_idx, current_idx);
      this.moveDown(min_idx);
    }
  }

  isEmpty() {
    return this.heap_size === 0 ? true : false;
  }

  swap(a, b) {
    const temp = this.heap[a];
    this.heap[a] = this.heap[b];
    this.heap[b] = temp;
  }
}

const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `7
4 40
4 60
1 20
2 50
3 30
4 10
6 5`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const N = Number(input());
  const data = [];

  for (let i = 0; i < N; i++) {
    const [d, w] = input().split(" ").map(Number);
    data.push({ d, w });
  }

  data.sort((a, b) => b.d - a.d);

  const queue = new PriorityQueue();
  let work_idx = 0;
  let result = 0;

  for (let i = data[0].d; i > 0; i--) {
    while (work_idx < N && data[work_idx].d >= i) {
      queue.insert(data[work_idx].w);
      work_idx += 1;
    }

    if (!queue.isEmpty()) {
      result += queue.pop();
    }
  }

  return result;
};

console.log(solution());
