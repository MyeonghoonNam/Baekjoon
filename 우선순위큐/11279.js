const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `13
0
1
2
0
0
3
2
1
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

class MaxHeap {
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
    if (this.size === 0) return 0;
    if (this.size === 1) {
      this.size--;
      return this.heap.pop();
    }

    const maxValue = this.heap[0];

    this.heap[0] = this.heap.pop();
    this.size--;
    this.moveDown();

    return maxValue;
  }

  moveUp() {
    let curIdx = this.size - 1;

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

  moveDown(curIdx = 0) {
    const leftIdx = curIdx * 2 + 1;
    const rightIdx = curIdx * 2 + 2;
    let maxIdx = curIdx;

    if (leftIdx < this.size && this.heap[leftIdx] > this.heap[maxIdx]) {
      maxIdx = leftIdx;
    }

    if (rightIdx < this.size && this.heap[rightIdx] > this.heap[maxIdx]) {
      maxIdx = rightIdx;
    }

    if (maxIdx !== curIdx) {
      [this.heap[maxIdx], this.heap[curIdx]] = [
        this.heap[curIdx],
        this.heap[maxIdx],
      ];

      this.moveDown(maxIdx);
    }
  }
}

const solution = () => {
  const N = Number(input());
  const heap = new MaxHeap();
  const result = [];

  for (let i = 0; i < N; i++) {
    const value = Number(input());

    if (value === 0) {
      const maxValue = heap.pop();
      result.push(maxValue);
    } else {
      heap.insert(value);
    }
  }

  return result.join("\n");
};

console.log(solution());

// const fs = require("fs");
// const stdin = (
//   process.platform === "linux"
//     ? fs.readFileSync("/dev/stdin").toString()
//     : `13
// 0
// 1
// 2
// 0
// 0
// 3
// 2
// 1
// 0
// 0
// 0
// 0
// 0`
// ).split("\n");

// const input = (() => {
//   let line = 0;
//   return () => stdin[line++];
// })();

// class MaxHeap {
//   constructor() {
//     this.heap = [];
//     this.size = 0;
//   }

//   insert(value) {
//     this.heap.push(value);
//     this.size++;
//     this.moveUp();
//   }

//   pop() {
//     if (this.size === 0) return 0;
//     if (this.size === 1) {
//       this.size--;
//       return this.heap.pop();
//     }

//     const maxValue = this.heap[0];

//     this.heap[0] = this.heap.pop();
//     this.size--;
//     this.moveDown();

//     return maxValue;
//   }

//   moveUp() {
//     let curIdx = this.size - 1;

//     while (curIdx > 0) {
//       const parentIdx = Math.floor((curIdx - 1) / 2);

//       if (this.heap[parentIdx] >= this.heap[curIdx]) break;

//       [this.heap[parentIdx], this.heap[curIdx]] = [
//         this.heap[curIdx],
//         this.heap[parentIdx],
//       ];
//       curIdx = parentIdx;
//     }
//   }

//   moveDown(curIdx = 0) {
//     const leftIdx = curIdx * 2 + 1;
//     const rightIdx = curIdx * 2 + 2;
//     let maxIdx = curIdx;

//     if (leftIdx < this.size && this.heap[leftIdx] > this.heap[maxIdx]) {
//       maxIdx = leftIdx;
//     }

//     if (rightIdx < this.size && this.heap[rightIdx] > this.heap[maxIdx]) {
//       maxIdx = rightIdx;
//     }

//     if (maxIdx !== curIdx) {
//       [this.heap[maxIdx], this.heap[curIdx]] = [
//         this.heap[curIdx],
//         this.heap[maxIdx],
//       ];
//       this.moveDown(maxIdx);
//     }
//   }
// }

// const solution = () => {
//   const N = Number(input());
//   const maxHeap = new MaxHeap();
//   const result = [];

//   for (let i = 0; i < N; i++) {
//     const value = Number(input());

//     if (value === 0) {
//       const maxValue = maxHeap.pop();
//       result.push(maxValue);
//     } else {
//       maxHeap.insert(value);
//     }
//   }

//   return result.join("\n");
// };

// console.log(solution());
