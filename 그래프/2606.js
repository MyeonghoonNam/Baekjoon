const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `7
6
1 2
2 3
1 5
5 2
5 6
4 7`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

// 4차 해결 bfs
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
    const new_node = new Node(value);

    if (this.isEmpty()) {
      this.head = this.tail = new_node;
    } else {
      this.tail.next = new_node;
      this.tail = new_node;
    }

    this.size++;
  }

  dequeue() {
    if (this.isEmpty()) return;

    const pop_node = this.head;
    this.head = pop_node.next;

    if (this.size === 1) {
      this.tail = this.head;
    }

    this.size--;

    return pop_node.value;
  }

  isEmpty() {
    return this.size === 0 ? true : false;
  }
}

const solution = () => {
  const N = Number(input());
  const K = Number(input());
  const graph = Array.from(new Array(N + 1), () => []);
  const visited = new Array(N + 1).fill(false);
  let count = 0;

  for (let i = 0; i < K; i += 1) {
    const [start, end] = input().split(" ").map(Number);

    graph[start].push(end);
    graph[end].push(start);
  }

  const bfs = (start) => {
    const queue = new Queue();

    queue.enqueue(start);
    visited[start] = true;

    while (!queue.isEmpty()) {
      const current = queue.dequeue();

      for (let i = 0; i < graph[current].length; i += 1) {
        const end = graph[current][i];

        if (!visited[end]) {
          queue.enqueue(end);
          count += 1;
          visited[end] = true;
        }
      }
    }
  };

  bfs(1);

  return count;
};

console.log(solution());

// 3차 해결 - dfs
// const solution = () => {
//   const N = Number(input());
//   const K = Number(input());
//   const graph = Array.from(new Array(N + 1), () => []);
//   const visited = new Array(N + 1).fill(false);
//   let count = 0;

//   for (let i = 0; i < K; i += 1) {
//     const [start, end] = input().split(" ").map(Number);

//     graph[start].push(end);
//     graph[end].push(start);
//   }

//   const dfs = (node) => {
//     visited[node] = true;
//     count += 1;

//     for (let i = 0; i < graph[node].length; i += 1) {
//       const next = graph[node][i];

//       if (!visited[next]) {
//         dfs(next);
//       }
//     }
//   };

//   dfs(1);

//   const result = count - 1;

//   return result;
// };

// console.log(solution());

// 2차 해결
// const solution = () => {
//   const N = Number(input());
//   const K = Number(input());
//   const graph = Array.from(new Array(N + 1), () => []);
//   const visited = new Array(N + 1).fill(false);
//   let count = 0;

//   for (let i = 0; i < K; i += 1) {
//     const [start, end] = input().split(" ").map(Number);

//     graph[start].push(end);
//     graph[end].push(start);
//   }

//   const dfs = (node) => {
//     visited[node] = true;
//     count += 1;

//     for (let i = 0; i < graph[node].length; i += 1) {
//       const next = graph[node][i];

//       if (!visited[next]) {
//         dfs(next);
//       }
//     }
//   };

//   dfs(1);

//   const result = count - 1;

//   return result;
// };

// console.log(solution());

// 1차 해결
// const solution = () => {
//   const N = Number(input());
//   const K = Number(input());
//   const graph = Array.from(new Array(N + 1), () => new Array());
//   const visited = new Array(N + 1).fill(false);
//   let result = 0;

//   for (let i = 0; i < K; i++) {
//     const [start, end] = input().split(" ").map(Number);

//     graph[start].push(end);
//     graph[end].push(start);
//   }

//   const dfs = (node) => {
//     visited[node] = true;
//     result += 1;

//     for (let i = 0; i < graph[node].length; i++) {
//       const next = graph[node][i];

//       if (!visited[next]) {
//         dfs(next);
//       }
//     }
//   };

//   dfs(1);

//   return result - 1;
// };

// console.log(solution());
