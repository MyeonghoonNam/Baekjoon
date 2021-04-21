const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const input = [];
rl.on('line', (line) => {
  // 입력 관리
  input.push(line.split(' ').map((el) => parseInt(el)));
}).on('close', () => {
  // 구현
  const N = input[0][0];
  const board = input.slice(1);

  let zeroCount = 0;
  let oneCount = 0;
  let minusOneCount = 0;

  Solution(0, 0, N);

  console.log(`${minusOneCount}\n${zeroCount}\n${oneCount}`);
  process.exit();

  function Solution(row, col, size) {
    if (numberCheck(row, col, size)) {
      if (board[row][col] === 0) {
        zeroCount++;
      } else if (board[row][col] === 1) {
        oneCount++;
      } else {
        minusOneCount++;
      }

      return;
    }

    const newSize = size / 3;

    Solution(row, col, newSize); // 왼쪽 위
    Solution(row, col + newSize, newSize); // 중앙 위
    Solution(row, col + 2 * newSize, newSize); // 오른쪽 위

    Solution(row + newSize, col, newSize); // 왼쪽 중간
    Solution(row + newSize, col + newSize, newSize); // 중앙 중간
    Solution(row + newSize, col + 2 * newSize, newSize); // 오른쪽 중간

    Solution(row + 2 * newSize, col, newSize); // 왼쪽 아래
    Solution(row + 2 * newSize, col + newSize, newSize); // 중앙 아래
    Solution(row + 2 * newSize, col + 2 * newSize, newSize); // 오른쪽 아래
  }

  function numberCheck(row, col, size) {
    const value = board[row][col];

    for (let i = row; i < row + size; i++) {
      for (let j = col; j < col + size; j++) {
        if (board[i][j] !== value) {
          return false;
        }
      }
    }

    return true;
  }
});
