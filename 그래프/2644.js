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
      this.tail = this.head;
    }

    this.size--;
    return popNode.value;
  }

  isEmpty() {
    return this.size === 0 ? true : false;
  }
}

const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `9
7 3
7
1 2
1 3
2 7
2 8
2 9
4 5
4 6`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

// BFS

const solution = () => {
  const N = Number(input());
  const [from, to] = input().split(" ").map(Number);
  const M = Number(input());
  const graph = Array.from(new Array(N + 1), () => new Array());
  const visited = new Array(N + 1).fill(false);
  let result = -1;

  for (let i = 0; i < M; i++) {
    const [from, to] = input().split(" ").map(Number);

    graph[from].push(to);
    graph[to].push(from);
  }

  const bfs = (from, to) => {
    const queue = new Queue();
    queue.enqueue({ node: from, count: 0 });
    visited[from] = true;

    while (!queue.isEmpty()) {
      const { node, count } = queue.dequeue();

      if (node === to) {
        result = count;
        break;
      }

      graph[node].forEach((v) => {
        if (!visited[v]) {
          queue.enqueue({ node: v, count: count + 1 });
          visited[v] = true;
        }
      });
    }
  };

  bfs(from, to);
  return result;
};

// DFS

// const solution = () => {
//   const N = Number(input());
//   const [from, to] = input().split(" ").map(Number);
//   const M = Number(input());
//   const graph = Array.from(new Array(N + 1), () => new Array());
//   const visited = new Array(N + 1).fill(false);
//   let result = 0;
//   let flagResult = false;

//   for (let i = 0; i < M; i++) {
//     const [from, to] = input().split(" ").map(Number);
//     graph[from].push(to);
//     graph[to].push(from);
//   }

//   const dfs = (node, count) => {
//     visited[node] = true;

//     if (node === to) {
//       result = count;
//       flagResult = true;
//       return;
//     }

//     for (let i = 0; i < graph[node].length; i++) {
//       const v = graph[node][i];

//       if (!visited[v]) {
//         dfs(v, count + 1);
//         if (flagResult) return;
//       }
//     }
//   };

//   dfs(from, 0);

//   if (!flagResult) {
//     result = -1;
//   }

//   return result;
// };

console.log(solution());
