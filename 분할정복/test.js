const input = [
  [8],
  [1, 1, 1, 1, 0, 0, 0, 0],
  [1, 1, 1, 1, 0, 0, 0, 0],
  [0, 0, 0, 1, 1, 1, 0, 0],
  [0, 0, 0, 1, 1, 1, 0, 0],
  [1, 1, 1, 1, 0, 0, 0, 0],
  [1, 1, 1, 1, 0, 0, 0, 0],
  [1, 1, 1, 1, 0, 0, 1, 1],
  [1, 1, 1, 1, 0, 0, 1, 1],
];

const N = input[0][0];
const board = input.slice(1);
let result = '';

Solution(0, 0, N);

console.log(result);

function Solution(row, col, size) {
  if (isPossible(row, col, size)) {
    result += board[row][col];
    return;
  }

  const newSize = size / 2;

  result += '(';

  Solution(row, col, newSize); // 2사분면
  Solution(row, col + newSize, newSize); // 1사분면
  Solution(row + newSize, col, newSize); // 3사분면
  Solution(row + newSize, col + newSize, newSize); // 4사분면

  result += ')';
}

function isPossible(row, col, size) {
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
