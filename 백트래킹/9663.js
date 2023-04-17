const fs = require("fs");
const stdin = (
  process.platform === "linux" ? fs.readFileSync("/dev/stdin").toString() : `8`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

// 3차 해결
const solution = () => {
  const N = Number(input());
  const queens = [];
  let result = 0;

  const isPossible = (x, y) => {
    for (let i = 0; i < queens.length; i++) {
      const [qx, qy] = queens[i];

      if (qx === x || qy === y) return false;
      if (Math.abs(qx - x) === Math.abs(qy - y)) return false;
    }

    return true;
  };

  const dfs = (row, i) => {
    if (row === N) {
      result += 1;
      return;
    }

    for (let i = 0; i < N; i++) {
      if (!isPossible(row, i)) continue;

      queens.push([row, i]);
      dfs(row + 1);
      queens.pop();
    }
  };

  dfs(0);

  return result;
};

// 2차 해결
// const solution = () => {
//   const N = Number(input());
//   const queens = [];
//   let result = 0;

//   const isPossible = (x, y) => {
//     for (let i = 0; i < queens.length; i++) {
//       const [a, b] = queens[i];

//       if (a === x || b === y) return false;
//       if (Math.abs(a - x) === Math.abs(b - y)) return false;
//     }

//     return true;
//   };

//   const dfs = (row) => {
//     if (row === N) {
//       result += 1;
//     }

//     for (let i = 0; i < N; i++) {
//       if (!isPossible(row, i)) continue;

//       queens.push([row, i]);
//       dfs(row + 1);
//       queens.pop();
//     }
//   };

//   dfs(0);

//   return result;
// };

// 1차 해결
// function solution() {
//   const N = Number(input());
//   const map = [];
//   let result = 0;

//   const isPossible = (idx) => {
//     for (let i = 0; i < idx; i++) {
//       if (map[idx] === map[i] || idx - i === Math.abs(map[idx] - map[i])) {
//         return false;
//       }
//     }

//     return true;
//   };

//   const nQueen = (cnt) => {
//     if (cnt === N) {
//       result++;
//       return;
//     }

//     for (let i = 0; i < N; i++) {
//       map[cnt] = i;

//       if (isPossible(cnt)) {
//         nQueen(cnt + 1);
//       }
//     }
//   };

//   nQueen(0);

//   return result;
// }

console.log(solution());
