class PriorityQueue {
  constructor() {
    this.heap = [];
    this.size = 0;
  }

  insert(value) {
    this.heap.push(value);
    this.size++;
    this.moveUp();
  }

  pop() {
    if (this.size === 1) {
      this.size--;
      return this.heap.pop();
    }

    const pop_value = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.size--;
    this.moveDown();
    return pop_value;
  }

  moveUp() {
    let current_idx = this.size - 1;

    while (current_idx > 0) {
      const parent_idx = parseInt((current_idx - 1) / 2);

      if (
        this.heap[parent_idx][0] < this.heap[current_idx][0] ||
        (this.heap[parent_idx][0] === this.heap[current_idx][0] &&
          this.heap[parent_idx][1] < this.heap[current_idx][1])
      ) {
        break;
      }

      this.swap(current_idx, parent_idx);
      current_idx = parent_idx;
    }
  }

  moveDown(current_idx = 0) {
    const leftChild_idx = current_idx * 2 + 1;
    const rightChild_idx = current_idx * 2 + 2;
    let min_idx = current_idx;

    if (
      leftChild_idx < this.size &&
      (this.heap[leftChild_idx][0] < this.heap[min_idx][0] ||
        (this.heap[leftChild_idx][0] === this.heap[min_idx][0] &&
          this.heap[leftChild_idx][1] < this.heap[min_idx][1]))
    ) {
      min_idx = leftChild_idx;
    }

    if (
      rightChild_idx < this.size &&
      (this.heap[rightChild_idx][0] < this.heap[min_idx][0] ||
        (this.heap[rightChild_idx][0] === this.heap[min_idx][0] &&
          this.heap[rightChild_idx][1] < this.heap[min_idx][1]))
    ) {
      min_idx = rightChild_idx;
    }

    if (min_idx !== current_idx) {
      this.swap(min_idx, current_idx);
      this.moveDown(min_idx);
    }
  }

  swap(a, b) {
    let temp = this.heap[a];
    this.heap[a] = this.heap[b];
    this.heap[b] = temp;
  }

  isEmpty() {
    return this.size === 0 ? true : false;
  }
}

const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `18
1
-1
0
0
0
1
1
-1
-1
2
-2
0
0
0
0
0
0
0`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const result = [];
  const queue = new PriorityQueue();
  let N = Number(input());

  while (N--) {
    const MOD = Number(input());

    if (MOD === 0) {
      if (queue.isEmpty()) {
        result.push(0);
      } else {
        const value = queue.pop()[1];
        result.push(value);
      }
    } else {
      queue.insert([Math.abs(MOD), MOD]);
    }
  }

  return result.join("\n");
};

console.log(solution());
