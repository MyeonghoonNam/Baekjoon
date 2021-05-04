const input = ['5', 'YCPZY', 'CYZZP', 'CCPPP', 'YCYZC', 'CPPZZ'];

const N = Number(input.shift());
const board = Array.from(new Array(N), () => new Array());
let result = 0;

for (let i = 0; i < N; i++) {
  board[i] = input.shift().split('');
}

console.log(Solution());

function Solution() {
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N - 1; j++) {
      [board[i][j], board[i][j + 1]] = [board[i][j + 1], board[i][j]];
      CheckBoard();
      [board[i][j], board[i][j + 1]] = [board[i][j + 1], board[i][j]];
    }
  }

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N - 1; j++) {
      [board[j][i], board[j + 1][i]] = [board[j][i], board[j + 1][i]];
      CheckBoard();
      [board[j][i], board[j + 1][i]] = [board[j][i], board[j + 1][i]];
    }
  }

  return result;
}

function CheckBoard() {
  let char = '';
  for (let i = 0; i < N; i++) {
    let count = 1;
    char = board[i][0];

    for (let j = 1; j < N; j++) {
      if (board[i][j] === char) {
        count++;
      } else {
        count = 1;
      }

      char = board[i][j];
      if (count > result) {
        result = count;
      }
    }
  }

  for (let i = 0; i < N; i++) {
    let count = 1;
    char = board[0][i];

    for (let j = 1; j < N; j++) {
      if (board[j][i] === char) {
        count++;
      } else {
        count = 1;
      }

      char = board[j][i];
      if (count > result) {
        result = count;
      }
    }
  }
}
