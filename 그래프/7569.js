const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `5 3 2
0 0 0 0 0
0 0 0 0 0
0 0 0 0 0
0 0 0 0 0
0 0 1 0 0
0 0 0 0 0`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.head = this.tail = null;
    this.size = 0;
  }

  enqueue(value) {
    const newNode = new Node(value);

    if (this.size === 0) {
      this.head = this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }

    this.size++;
  }

  dequeue() {
    if (this.size === 0) return;

    const popNode = this.head;
    this.head = popNode.next;

    if (this.size === 1) {
      this.tail = null;
    }

    this.size--;

    return popNode.value;
  }

  isEmpty() {
    return this.size === 0 ? true : false;
  }
}

const solution = () => {
  const [M, N, H] = input().split(" ").map(Number);
  const boxes = [];
  const visited = Array.from(new Array(H), () =>
    Array.from(new Array(N), () => new Array(M).fill(false))
  );

  const queue = new Queue();

  for (let i = 0; i < H; i++) {
    const box = [];

    for (let j = 0; j < N; j++) {
      const row = input().split(" ").map(Number);

      for (let k = 0; k < M; k++) {
        if (row[k] === 1) {
          queue.enqueue([i, j, k, 0]);
          visited[i][j][k] = true;
        }
      }

      box.push(row);
    }

    boxes.push(box);
  }

  const isValidPosition = (h, x, y) => {
    if (h >= 0 && x >= 0 && y >= 0 && h < H && x < N && y < M) return true;
    else return false;
  };

  const isValidTomatoState = () => {
    for (let h = 0; h < H; h++) {
      for (let n = 0; n < N; n++) {
        for (let m = 0; m < M; m++) {
          if (boxes[h][n][m] === 0) {
            return false;
          }
        }
      }
    }

    return true;
  };

  // 익은 토마토가 없는 경우, 즉, -1과 0만 존재
  if (queue.isEmpty() === true) {
    return -1;
  }

  const dx = [-1, 1, 0, 0, 0, 0];
  const dy = [0, 0, -1, 1, 0, 0];
  const dh = [0, 0, 0, 0, 1, -1];

  while (queue.isEmpty() === false) {
    const [h, x, y, d] = queue.dequeue();

    day = d;

    for (let i = 0; i < 6; i++) {
      const nh = h + dh[i];
      const nx = x + dx[i];
      const ny = y + dy[i];

      if (isValidPosition(nh, nx, ny) === false) continue;

      if (visited[nh][nx][ny] === false && boxes[nh][nx][ny] === 0) {
        queue.enqueue([nh, nx, ny, d + 1]);
        visited[nh][nx][ny] = true;
        boxes[nh][nx][ny] = 1;
      }
    }
  }

  const state = isValidTomatoState();
  const result = state ? day : -1;

  return result;
};

console.log(solution());

// let fs = require("fs");
// let input = fs.readFileSync("/dev/stdin").toString().split("\n");

// const ds = [
//   [-1, 0, 0],
//   [1, 0, 0],
//   [0, 1, 0],
//   [0, -1, 0],
//   [0, 0, 1],
//   [0, 0, -1],
// ];
// const [M, N, H] = input.shift().split(" ").map(Number);
// let queue = [];
// let visit = [...Array(H)].map((h) =>
//   [...Array(N)].map((n) => Array(M).fill(0))
// );
// let count = M * N * H;
// let z = 0;
// let answer;

// for (let i = 0; i < input.length; i++) {
//   let box = input[i].split(" ").map(Number);
//   box.forEach((tomato, pos) => {
//     if (tomato === 1) {
//       queue.push([i % N, pos, z, 0]);
//       visit[z][i % N][pos] = 1;
//       count--;
//     } else if (tomato === -1) {
//       visit[z][i % N][pos] = 1;
//       count--;
//     }
//   });
//   if ((i + 1) % N === 0) ++z;
// }

// let idx = 0;
// while (queue.length != idx) {
//   const [x, y, z, pos] = queue[idx];
//   for (let i = 0; i < ds.length; i++) {
//     const xPos = x + ds[i][0];
//     const yPos = y + ds[i][1];
//     const zPos = z + ds[i][2];

//     if (xPos < 0 || yPos < 0 || zPos < 0 || xPos >= N || yPos >= M || zPos >= H)
//       continue;
//     if (!visit[zPos][xPos][yPos]) {
//       visit[zPos][xPos][yPos] = 1;
//       queue.push([xPos, yPos, zPos, pos + 1]);
//       count--;
//     }
//   }

//   idx++;
//   answer = pos;
// }

// console.log(count ? -1 : answer);

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
