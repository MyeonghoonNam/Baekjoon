// 백준 런타임 에러 발생
// 알고리즘 해결에는 문제 없음

// const fs = require("fs");
// const stdin = (
//   process.platform === "linux"
//     ? fs.readFileSync("/dev/stdin").toString()
//     : `7 8
// 0 1 3
// 1 1 7
// 0 7 6
// 1 7 1
// 0 3 7
// 0 4 2
// 0 1 1
// 1 1 1`
// ).split("\n");

// const input = (() => {
//   let line = 0;
//   return () => stdin[line++];
// })();

// const solution = () => {
//   const findParent = (parent, v) => {
//     if (parent[v] !== v) {
//       parent[v] = findParent(parent, parent[v]);
//     }

//     return parent[v];
//   };

//   const unionParent = (parent, start, end) => {
//     start = findParent(parent, start);
//     end = findParent(parent, end);

//     if (start < end) {
//       parent[end] = start;
//     } else {
//       parent[start] = end;
//     }
//   };

//   const [N, M] = input().split(" ").map(Number);
//   const parent = new Array(N + 1);
//   let result = [];

//   for (let i = 1; i <= N; i++) {
//     parent[i] = i;
//   }

//   for (let i = 0; i < M; i++) {
//     const [mod, start, end] = input().split(" ").map(Number);

//     if (mod === 0) {
//       unionParent(parent, start, end);
//     } else {
//       if (findParent(parent, start) === findParent(parent, end)) {
//         result.push("YES");
//       } else {
//         result.push("NO");
//       }
//     }
//   }

//   return result.join("\n");
// };

// console.log(solution());

const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

const fun = (input) => {
  const [n, m] = input
    .shift()
    .split(" ")
    .map((x) => +x);

  const a = input.map((v) => v.split(" ").map((x) => +x));

  const b = new Array(n + 1).fill(null).map((_, idx) => idx);
  const result = [];

  const findParent = (x) => {
    if (x === b[x]) return x;
    b[x] = findParent(b[x]);
    return b[x];
  };

  const isUnion = (x, y) => {
    x = findParent(x);
    y = findParent(y);
    return x === y ? "YES" : "NO";
  };

  const setUnion = (x, y) => {
    x = findParent(x);
    y = findParent(y);
    if (x < y) {
      b[y] = x;
    } else {
      b[x] = y;
    }
  };

  for (let i = 0; i < m; i++) {
    const [c, x, y] = a[i];
    if (c === 0) {
      setUnion(x, y);
    } else if (c === 1) {
      result.push(isUnion(x, y));
    }
  }

  console.log(result.join("\n"));
};

rl.on("line", function (line) {
  input.push(line);
}).on("close", function () {
  fun(input);
  process.exit();
});
