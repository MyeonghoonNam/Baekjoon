const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `7
0110100
0110101
1110101
0000111
0100000
0111110
0111000`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

// 2차 해결
const solution = () => {
  const N = Number(input());
  const map = [];
  const visited = Array.from(new Array(N), () => new Array(N).fill(false));
  let apartmentComplexCount = 0;
  let aptartmentCount = [];
  let count = 0;

  const dx = [-1, 1, 0, 0];
  const dy = [0, 0, -1, 1];

  for (let i = 0; i < N; i++) {
    const row = input().split("").map(Number);
    map.push(row);
  }

  const dfs = (x, y) => {
    visited[x][y] = true;
    count += 1;

    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];

      if (!checkMapRange(nx, ny)) continue;

      if (!visited[nx][ny] && map[nx][ny] === 1) {
        dfs(nx, ny);
      }
    }
  };

  const checkMapRange = (x, y) => {
    if (x >= 0 && y >= 0 && x < N && y < N) return true;
    else return false;
  };

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (!visited[i][j] && map[i][j] === 1) {
        dfs(i, j);

        apartmentComplexCount += 1;
        aptartmentCount.push(count);
        count = 0;
      }
    }
  }

  aptartmentCount.sort((a, b) => a - b);

  const result = [apartmentComplexCount, ...aptartmentCount].join("\n");

  return result;
};

// 1차 해결
// const solution = () => {
//   const N = Number(input());
//   const map = [];
//   let group_count = [];
//   let home_count = 0;
//   const dx = [-1, 1, 0, 0];
//   const dy = [0, 0, -1, 1];

//   for (let i = 0; i < N; i++) {
//     const row = input().split("").map(Number);
//     map.push(row);
//   }

//   const dfs = (x, y) => {
//     map[x][y] = 0;
//     home_count++;

//     for (let i = 0; i < 4; i++) {
//       const nx = x + dx[i];
//       const ny = y + dy[i];

//       if (checkMapRange(nx, ny) && map[nx][ny] === 1) {
//         dfs(nx, ny);
//       }
//     }
//   };

//   const checkMapRange = (x, y) => {
//     if (x >= 0 && y >= 0 && x < N && y < N) return true;
//     else return false;
//   };

//   const process = () => {
//     for (let i = 0; i < N; i++) {
//       for (let j = 0; j < N; j++) {
//         if (map[i][j] === 1) {
//           dfs(i, j);
//           group_count.push(home_count);
//           home_count = 0;
//         }
//       }
//     }
//   };

//   process();
//   group_count.sort((a, b) => a - b);

//   const result = [group_count.length].concat(group_count).join("\n");
//   return result;
// };

console.log(solution());
