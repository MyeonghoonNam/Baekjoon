const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

class MinHeap {
  constructor() {
    this.heap = [];
  }

  size = () => {
    return this.heap.length;
  };

  input = (node) => {
    if (this.size() === N) {
      if (node > this.heap[0]) this.heap[0] = node;
      this.bubbleDown();
      return;
    }

    this.heap.push(node);
    this.bubbleUp();
  };

  bubbleUp = (current = this.size() - 1) => {
    if (current === 0) return;
    const parent = Math.floor((current - 1) / 2);
    if (this.heap[parent] <= this.heap[current]) return;

    [this.heap[current], this.heap[parent]] = [
      this.heap[parent],
      this.heap[current],
    ];
    this.bubbleUp(parent);
  };

  output = () => {
    if (this.size() === 1) return this.heap.pop();

    const min = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.bubbleDown();
    return min;
  };

  bubbleDown = (current = 0) => {
    const left = current * 2 + 1;
    const right = current * 2 + 2;
    const length = this.size();
    let parent = current;

    if (left <= length && this.heap[left] < this.heap[parent]) {
      parent = left;
    }
    if (right <= length && this.heap[right] < this.heap[parent]) {
      parent = right;
    }
    if (parent !== current) {
      [this.heap[parent], this.heap[current]] = [
        this.heap[current],
        this.heap[parent],
      ];
      this.bubbleDown(parent);
    }
  };
}

const min = new MinHeap();
let start = false;
let N;
let count;

rl.on("line", function (line) {
  if (!start) {
    start = true;
    N = parseInt(line);
    count = N;
    return;
  }
  count--;

  const arr = line.split(" ").map((value) => parseInt(value));
  arr.forEach((num) => {
    min.input(num);
  });
  if (count === 0) rl.close();
  return;
}).on("close", function () {
  console.log(min.heap[0]);
  process.exit();
});
