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

// 2차 해결
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

  const dfs = (node) => {
    visited[node] = true;
    count += 1;

    for (let i = 0; i < graph[node].length; i += 1) {
      const next = graph[node][i];

      if (!visited[next]) {
        dfs(next);
      }
    }
  };

  dfs(1);

  const result = count - 1;

  return result;
};

console.log(solution());

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
