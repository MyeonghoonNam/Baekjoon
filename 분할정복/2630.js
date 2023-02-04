const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `8
1 1 0 0 0 0 1 1
1 1 0 0 0 0 1 1
0 0 0 0 1 1 0 0
0 0 0 0 1 1 0 0
1 0 0 0 1 1 1 1
0 1 0 0 1 1 1 1
0 0 1 1 1 1 1 1
0 0 1 1 1 1 1 1`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const N = Number(input());
  const board = [];
  let whiteBoardCount = 0;
  let blueBoardCount = 0;

  for (let i = 0; i < N; i++) {
    board.push(input().split(" "));
  }

  const divideBoard = (row, col, size) => {
    if (checkColor(row, col, size)) {
      const color = board[row][col];

      if (color === "0") {
        whiteBoardCount++;
      } else if (color === "1") {
        blueBoardCount++;
      }

      return;
    }

    const halfSize = parseInt(size / 2);

    divideBoard(row, col, halfSize);
    divideBoard(row, col + halfSize, halfSize);
    divideBoard(row + halfSize, col, halfSize);
    divideBoard(row + halfSize, col + halfSize, halfSize);
  };

  const checkColor = (row, col, size) => {
    const color = board[row][col];

    for (let i = row; i < row + size; i++) {
      for (let j = col; j < col + size; j++) {
        if (board[i][j] !== color) {
          return false;
        }
      }
    }

    return true;
  };

  divideBoard(0, 0, N);

  const result = `${whiteBoardCount}\n${blueBoardCount}`;
  return result;
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
//   input.push(line.split(' ').map((el) => parseInt(el)));
// }).on('close', () => {
//   // 구현
//   const N = input[0][0];
//   let whiteCount = 0;
//   let blueCount = 0;

//   const board = input.slice(1);

//   Solution(0, 0, N);

//   const result = `${whiteCount}\n${blueCount}`;

//   console.log(result);
//   process.exit();

//   function Solution(row, col, size) {
//     if (ColorCheck(row, col, size)) {
//       if (board[row][col] === 0) {
//         whiteCount++;
//       } else {
//         blueCount++;
//       }

//       return;
//     }

//     const newSize = size / 2;

//     Solution(row, col, newSize); // 2사분면
//     Solution(row, col + newSize, newSize); // 1사분면
//     Solution(row + newSize, col, newSize); // 3사분면
//     Solution(row + newSize, col + newSize, newSize); // 4사분면
//   }

//   function ColorCheck(row, col, size) {
//     const color = board[row][col];

//     for (let i = row; i < row + size; i++) {
//       for (let j = col; j < col + size; j++) {
//         if (board[i][j] !== color) {
//           return false;
//         }
//       }
//     }

//     return true;
//   }
// });
