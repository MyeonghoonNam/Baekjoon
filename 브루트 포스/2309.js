const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `20
7
23
19
10
15
25
8
13`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

// 문제 2차 해결
const solution = () => {
  const people = [];
  const result = [];
  let sum = 0;

  for (let i = 0; i < 9; i++) {
    const height = Number(input());

    people.push(height);
    sum += height;
  }

  people.sort((a, b) => a - b);

  for (let i = 0; i < 9; i++) {
    for (let j = i + 1; j < 9; j++) {
      if (sum - (people[i] + people[j]) !== 100) continue;

      for (let k = 0; k < 9; k++) {
        if (k === i || k === j) continue;

        result.push(people[k]);
      }

      return result.join("\n");
    }
  }
};

console.log(solution());

// const readline = require('readline');

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// const input = [];
// rl.on('line', (line) => {
//   // 입력 관리
//   input.push(Number(line));
// }).on('close', () => {
//   // 구현
//   console.log(Solution(input));

//   function Solution(input) {
//     input.sort((a, b) => a - b);

//     const sum = input.reduce((acc, cur) => {
//       return acc + cur;
//     });

//     let result = '';
//     for (let i = 0; i < input.length; i++) {
//       for (let j = i + 1; j < input.length; j++) {
//         if (sum - input[i] - input[j] === 100) {
//           for (let k = 0; k < input.length; k++) {
//             if (k === i || k === j) continue;

//             result += input[k] + '\n';
//           }

//           return result;
//         }
//       }
//     }
//   }
// });
