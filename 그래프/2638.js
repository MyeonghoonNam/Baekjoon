const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `8 9
0 0 0 0 0 0 0 0 0
0 0 0 1 1 0 0 0 0
0 0 0 1 1 0 1 1 0
0 0 1 1 1 1 1 1 0
0 0 1 1 1 1 1 0 0
0 0 1 1 0 1 1 0 0
0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0`
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
  let visited = [];
  let result = 0;

  const dx = [-1, 1, 0, 0];
  const dy = [0, 0, -1, 1];

  for (let i = 0; i < N; i++) {
    map.push(input().split(" ").map(Number));
  }

  const hasCheese = () => {
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < M; j++) {
        if (map[i][j] === 1) {
          return true;
        }
      }
    }

    return false;
  };

  const setCheesInteriorAndOutterSpace = () => {
    const queue = new Queue();

    queue.enqueue([0, 0]);
    visited[0][0] = true;

    while (queue.isEmpty() === false) {
      const [x, y] = queue.dequeue();

      for (let i = 0; i < 4; i++) {
        const nx = x + dx[i];
        const ny = y + dy[i];

        if (isValidMapRange(nx, ny) === false) continue;

        if (visited[nx][ny] === false && map[nx][ny] === 0) {
          queue.enqueue([nx, ny]);
          visited[nx][ny] = true;
        }
      }
    }
  };

  const isValidMapRange = (x, y) => {
    if (x >= 0 && y >= 0 && x < N && y < M) return true;
    else return false;
  };

  const getCheeseListBeMelt = () => {
    const cheeseListBeMelt = [];

    for (let i = 0; i < N; i++) {
      for (let j = 0; j < M; j++) {
        if (map[i][j] === 1 && visited[i][j] === false) {
          const cheese = getCheeseBeMelt(i, j);

          if (cheese) {
            cheeseListBeMelt.push(cheese);
          }
        }
      }
    }

    return cheeseListBeMelt;
  };

  const getCheeseBeMelt = (x, y) => {
    let outterAirCount = 0;

    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];

      if (isValidMapRange(nx, ny) === false) continue;

      if (map[nx][ny] === 0 && visited[nx][ny] === true) {
        outterAirCount++;
      }

      if (outterAirCount >= 2) {
        return [x, y];
      }
    }
  };

  const setMeltCheese = (cheeseListBeMelt) => {
    for (let i = 0; i < cheeseListBeMelt.length; i++) {
      const [x, y] = cheeseListBeMelt[i];
      map[x][y] = 0;
    }
  };

  while (hasCheese() === true) {
    visited = Array.from(new Array(N), () => new Array(M).fill(false));

    setCheesInteriorAndOutterSpace();
    setMeltCheese(getCheeseListBeMelt());

    result++;
  }

  return result;
};

// dfs
// const solution = () => {
//   const [N, M] = input().split(" ").map(Number);
//   const map = [];
//   let visited = [];
//   let cheeseListBeMelt = [];
//   let result = 0;

//   for (let i = 0; i < N; i++) {
//     map.push(input().split(" ").map(Number));
//   }

//   const dx = [-1, 1, 0, 0];
//   const dy = [0, 0, -1, 1];

//   const setCheesInteriorAndOutterSpace = (x, y) => {
//     visited[x][y] = true;

//     for (let i = 0; i < 4; i++) {
//       const nx = x + dx[i];
//       const ny = y + dy[i];

//       if (isValidMapRange(nx, ny) === false) continue;

//       if (map[nx][ny] === 0 && visited[nx][ny] === false) {
//         setCheesInteriorAndOutterSpace(nx, ny);
//       }
//     }
//   };

//   const isValidMapRange = (x, y) => {
//     if (x >= 0 && y >= 0 && x < N && y < M) return true;
//     else return false;
//   };

//   const hasCheese = () => {
//     for (let i = 0; i < N; i++) {
//       for (let j = 0; j < M; j++) {
//         if (map[i][j] === 1) return true;
//       }
//     }

//     return false;
//   };

//   const getCheeseListBeMelt = (x, y) => {
//     let outterAirCount = 0;

//     for (let i = 0; i < 4; i++) {
//       const nx = x + dx[i];
//       const ny = y + dy[i];

//       if (isValidMapRange(nx, ny) === false) continue;

//       if (map[nx][ny] === 0 && visited[nx][ny] === true) {
//         outterAirCount++;
//       }

//       if (outterAirCount >= 2) {
//         cheeseListBeMelt.push([x, y]);
//         break;
//       }
//     }
//   };

//   const setMeltCheese = () => {
//     for (let i = 0; i < cheeseListBeMelt.length; i++) {
//       const [x, y] = cheeseListBeMelt[i];
//       map[x][y] = 0;
//     }
//   };

//   while (hasCheese() === true) {
//     visited = Array.from(new Array(N), () => new Array(M).fill(false));
//     cheeseListBeMelt = [];

//     setCheesInteriorAndOutterSpace(0, 0);

//     for (let i = 0; i < N; i++) {
//       for (let j = 0; j < M; j++) {
//         if (map[i][j] === 1 && visited[i][j] === false) {
//           getCheeseListBeMelt(i, j);
//         }
//       }
//     }

//     setMeltCheese();
//     result++;
//   }

//   return result;
// };

console.log(solution());
