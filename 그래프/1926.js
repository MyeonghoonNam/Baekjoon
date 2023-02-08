const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `6 5
1 1 0 1 1
0 1 1 0 0
0 0 0 0 0
1 0 1 1 1
0 0 1 1 1
0 0 1 1 1`
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

// bfs
const solution = () => {
  const [N, M] = input().split(" ").map(Number);
  const map = [];
  const visited = Array.from(new Array(N), () => new Array(M).fill(false));

  let pictureCount = 0;
  let pictureArea = 0;
  let pictureMaxArea = 0;

  for (let i = 0; i < N; i++) {
    map.push(input().split(" ").map(Number));
  }

  const bfs = (x, y) => {
    const queue = new Queue();
    queue.enqueue([x, y]);
    visited[x][y] = true;
    pictureArea++;

    const dx = [-1, 1, 0, 0];
    const dy = [0, 0, -1, 1];

    while (queue.isEmpty() === false) {
      const [x, y] = queue.dequeue();

      for (let i = 0; i < 4; i++) {
        const nx = x + dx[i];
        const ny = y + dy[i];

        if (checkRangeMap(nx, ny) === false) continue;

        if (visited[nx][ny] === false && map[nx][ny] === 1) {
          queue.enqueue([nx, ny]);
          visited[nx][ny] = true;
          pictureArea++;
        }
      }
    }
  };

  const checkRangeMap = (x, y) => {
    if (x >= 0 && y >= 0 && x < N && y < M) return true;
    else return false;
  };

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (visited[i][j] === false && map[i][j] === 1) {
        bfs(i, j);
        pictureCount++;

        if (pictureMaxArea < pictureArea) {
          pictureMaxArea = pictureArea;
        }

        pictureArea = 0;
      }
    }
  }

  const result = `${pictureCount}\n${pictureMaxArea}`;

  return result;
};

// dfs
// const solution = () => {
//   const [N, M] = input().split(" ").map(Number);
//   const map = [];
//   const visited = Array.from(new Array(N), () => new Array(M).fill(false));

//   let pictureCount = 0;
//   let pictureArea = 0;
//   let pictureMaxArea = 0;

//   for (let i = 0; i < N; i++) {
//     map.push(input().split(" ").map(Number));
//   }

//   const dfs = (x, y) => {
//     visited[x][y] = true;
//     pictureArea++;

//     const dx = [-1, 1, 0, 0];
//     const dy = [0, 0, -1, 1];

//     for (let i = 0; i < 4; i++) {
//       const nx = x + dx[i];
//       const ny = y + dy[i];

//       if (checkRangeMap(nx, ny) === false) continue;

//       if (visited[nx][ny] === false && map[nx][ny] === 1) {
//         dfs(nx, ny);
//       }
//     }
//   };

//   const checkRangeMap = (x, y) => {
//     if (x >= 0 && y >= 0 && x < N && y < M) return true;
//     else return false;
//   };

//   for (let i = 0; i < N; i++) {
//     for (let j = 0; j < M; j++) {
//       if (map[i][j] === 1 && visited[i][j] === false) {
//         dfs(i, j);
//         pictureCount++;

//         if (pictureMaxArea < pictureArea) {
//           pictureMaxArea = pictureArea;
//         }

//         pictureArea = 0;
//       }
//     }
//   }

//   const result = `${pictureCount}\n${pictureMaxArea}`;

//   return result;
// };

console.log(solution());
