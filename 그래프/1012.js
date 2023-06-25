const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `2
10 8 17
0 0
1 0
1 1
4 2
4 3
4 5
2 4
3 4
7 4
8 4
9 4
7 5
8 5
9 5
7 6
8 6
9 6
10 10 1
5 5`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

// 3차 해결
const solution = () => {
  const result = [];
  let T = Number(input());

  while (T--) {
    const [M, N, K] = input().split(" ").map(Number);
    const map = Array.from(new Array(N), () => new Array(M).fill(0));
    const visited = Array.from(new Array(N), () => new Array(M).fill(false));
    const dx = [0, 0, -1, 1];
    const dy = [-1, 1, 0, 0];
    let count = 0;

    for (let i = 0; i < K; i++) {
      const [X, Y] = input().split(" ").map(Number);
      map[Y][X] = 1;
    }

    const dfs = (y, x) => {
      visited[y][x] = true;

      for (let i = 0; i < 4; i++) {
        const nx = x + dx[i];
        const ny = y + dy[i];

        if (!checkMapRange(ny, nx)) continue;

        if (!visited[ny][nx] && map[ny][nx] === 1) {
          dfs(ny, nx);
        }
      }
    };

    const checkMapRange = (y, x) => {
      if (x >= 0 && y >= 0 && x < M && y < N) return true;
      else return false;
    };

    for (let i = 0; i < N; i++) {
      for (let j = 0; j < M; j++) {
        if (!visited[i][j] && map[i][j] === 1) {
          dfs(i, j);
          count += 1;
        }
      }
    }

    result.push(count);
  }

  return result.join("\n");
};

console.log(solution());

// 2차 해결
// const solution = () => {
//   const result = [];
//   let T = Number(input());
//   while (T--) {
//     const [M, N, K] = input().split(" ").map(Number);
//     const graph = Array.from(new Array(N), () => new Array(M).fill(0));
//     const visited = Array.from(new Array(N), () => new Array(M).fill(false));
//     const dx = [0, 0, -1, 1];
//     const dy = [-1, 1, 0, 0];
//     let count = 0;

//     for (let i = 0; i < K; i++) {
//       const [X, Y] = input().split(" ").map(Number);
//       graph[Y][X] = 1;
//     }

//     const dfs = (y, x) => {
//       visited[y][x] = true;

//       for (let i = 0; i < 4; i++) {
//         const nx = x + dx[i];
//         const ny = y + dy[i];

//         if (!checkMapRange(ny, nx)) continue;

//         if (!visited[ny][nx] && graph[ny][nx] === 1) {
//           dfs(ny, nx);
//         }
//       }
//     };

//     const checkMapRange = (y, x) => {
//       if (x >= 0 && y >= 0 && x < M && y < N) return true;
//       else return false;
//     };

//     for (let i = 0; i < N; i++) {
//       for (let j = 0; j < M; j++) {
//         if (!visited[i][j] && graph[i][j] === 1) {
//           dfs(i, j);
//           count += 1;
//         }
//       }
//     }

//     result.push(count);
//   }

//   return result.join("\n");
// };

// 1차 해결
// const solution = () => {
//   let T = Number(input());
//   const result = [];

//   while (T--) {
//     const [M, N, K] = input().split(" ").map(Number);
//     const map = Array.from(new Array(N), () => new Array(M).fill(0));
//     const visited = Array.from(new Array(N), () => new Array(M).fill(false));
//     let count = 0;

//     for (let i = 0; i < K; i++) {
//       const [x, y] = input().split(" ").map(Number);
//       map[y][x] = 1;
//     }

//     const dx = [0, 0, -1, 1];
//     const dy = [-1, 1, 0, 0];

//     const dfs = (y, x) => {
//       visited[y][x] = true;

//       for (let i = 0; i < 4; i++) {
//         const nx = x + dx[i];
//         const ny = y + dy[i];

//         if (!checkMapRange(ny, nx)) continue;

//         if (map[ny][nx] === 1 && !visited[ny][nx]) {
//           dfs(ny, nx);
//         }
//       }
//     };

//     const checkMapRange = (y, x) => {
//       if (x >= 0 && x < M && y >= 0 && y < N) return true;
//       else return false;
//     };

//     for (let i = 0; i < N; i++) {
//       for (let j = 0; j < M; j++) {
//         if (!visited[i][j] && map[i][j] === 1) {
//           dfs(i, j);
//           count += 1;
//         }
//       }
//     }

//     result.push(count);
//   }

//   return result.join("\n");
// };

console.log(solution());
