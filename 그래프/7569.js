let fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().split("\n");

const ds = [
  [-1, 0, 0],
  [1, 0, 0],
  [0, 1, 0],
  [0, -1, 0],
  [0, 0, 1],
  [0, 0, -1],
];
const [M, N, H] = input.shift().split(" ").map(Number);
let queue = [];
let visit = [...Array(H)].map((h) =>
  [...Array(N)].map((n) => Array(M).fill(0))
);
let count = M * N * H;
let z = 0;
let answer;

for (let i = 0; i < input.length; i++) {
  let box = input[i].split(" ").map(Number);
  box.forEach((tomato, pos) => {
    if (tomato === 1) {
      queue.push([i % N, pos, z, 0]);
      visit[z][i % N][pos] = 1;
      count--;
    } else if (tomato === -1) {
      visit[z][i % N][pos] = 1;
      count--;
    }
  });
  if ((i + 1) % N === 0) ++z;
}

let idx = 0;
while (queue.length != idx) {
  const [x, y, z, pos] = queue[idx];
  for (let i = 0; i < ds.length; i++) {
    const xPos = x + ds[i][0];
    const yPos = y + ds[i][1];
    const zPos = z + ds[i][2];

    if (xPos < 0 || yPos < 0 || zPos < 0 || xPos >= N || yPos >= M || zPos >= H)
      continue;
    if (!visit[zPos][xPos][yPos]) {
      visit[zPos][xPos][yPos] = 1;
      queue.push([xPos, yPos, zPos, pos + 1]);
      count--;
    }
  }

  idx++;
  answer = pos;
}

console.log(count ? -1 : answer);
// const fs = require("fs");
// const stdin = (
//   process.platform === "linux"
//     ? fs.readFileSync("/dev/stdin").toString()
//     : `5 3 1
// 0 -1 0 0 0
// -1 -1 0 1 1
// 0 0 0 1 1`
// ).split("\n");

// const input = (() => {
//   let line = 0;
//   return () => stdin[line++];
// })();

// class Node {
//   constructor(value) {
//     this.value = value;
//     this.next = null;
//   }
// }

// class Queue {
//   constructor() {
//     this.head = this.tail = null;
//     this.size = 0;
//   }

//   enqueue(value) {
//     const newNode = new Node(value);

//     if (this.size === 0) {
//       this.head = this.tail = newNode;
//     } else {
//       this.tail.next = newNode;
//       this.tail = newNode;
//     }

//     this.size++;
//   }

//   dequeue() {
//     if (this.size === 0) return;

//     const popNode = this.head;
//     this.head = popNode.next;

//     if (this.size === 1) {
//       this.tail = null;
//     }

//     this.size--;

//     return popNode.value;
//   }

//   isEmpty() {
//     return this.size === 0 ? true : false;
//   }
// }

// const solution = () => {
//   const [M, N, H] = input().split(" ").map(Number);
//   const boxes = [];
//   const visited = [];

//   const box = [];
//   for (let i = 0; i < N; i++) {
//     const row = input().split(" ").map(Number);
//     box.push(row);
//   }

//   for (let i = 0; i < H; i++) {
//     boxes.push(box);
//   }

//   const bfs = () => {
//     const queue = new Queue();
//     queue.enqueue([]);

//     while (queue.isEmpty() === false) {
//       //
//     }
//   };

//   for(let i = 0; i < N; i++) {
//     for(let j = 0; j < M ;j ++) {
//       if(boxes[0][i][j] === 1 && visited[0][i][j] === false) {
//         bfs(i, j);
//       }
//     }
//   }
// };

// console.log(solution());
