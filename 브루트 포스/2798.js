const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `5 21
5 6 7 8 9`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const [N, M] = input().split(" ").map(Number);
  const numbers = input().split(" ").map(Number);
  const selectedNumbers = [];
  const selectedIndex = new Array(numbers.length).fill(false);
  let result = 0;

  const dfs = (idx, cnt) => {
    if (cnt === 3) {
      const sum = selectedNumbers.reduce((acc, cur) => {
        return acc + cur;
      });

      if (sum <= M && sum > result) result = sum;

      return;
    }

    for (let i = idx; i < N; i++) {
      if (!selectedIndex[i]) {
        selectedIndex[i] = true;
        selectedNumbers[cnt] = numbers[i];
        dfs(i, cnt + 1);
        selectedIndex[i] = false;
      }
    }
  };

  dfs(0, 0);

  return result;
};

console.log(solution());

// 'use strict';

// const fs = require('fs');
// const stdin = (
//   process.platform === 'linux'
//     ? fs.readFileSync('/dev/stdin').toString()
//     : `10 500
// 93 181 245 214 315 36 185 138 216 295`
// ).split('\n');

// const input = (() => {
//   let line = 0;
//   return () => stdin[line++];
// })();

// console.log(Solution());

// function Solution() {
//   const [N, M] = input().split(' ').map(Number);
//   const numbers = input().split(' ').map(Number);
//   const choiceNumbers = [];
//   const choiced = new Array(numbers.length).fill(false);
//   let result = 0;

//   const dfs = (idx, cnt) => {
//     if (cnt === 3) {
//       const sum = choiceNumbers.reduce((acc, cur) => {
//         return acc + cur;
//       });

//       if (sum <= M && sum > result) result = sum;

//       return;
//     }

//     for (let i = idx; i < N; i++) {
//       if (!choiced[i]) {
//         choiced[i] = true;
//         choiceNumbers[cnt] = numbers[i];
//         dfs(i, cnt + 1);
//         choiced[i] = false;
//       }
//     }
//   };

//   dfs(0, 0);

//   return result;
// }
