const input = ['5', 'YCPZY', 'CYZZP', 'CCPPP', 'YCYZC', 'CPPZZ'];

const N = Number(input.shift());
const board = Array.from(new Array(N), () => new Array());

for (let i = 0; i < N; i++) {
  board[i] = input.shift().split('');
}

console.log(Solution());

function Solution() {
  let max = 1;
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

  console.log(result);
}

function CheckBoard() {
  let max = 0;

  for (let i = 0; i < N; i++) {
    let char = board[i][0];
    let count = 1;

    for (let j = 1; j < N; j++) {
      if (board[i][j] === char) {
        count++;
      } else {
        if (count > max) {
          max = count;
        }
        char = board[i][j];
        count = 1;
      }

      if (count > max) max = count;
    }
  }

  for (let i = 0; i < N; i++) {
    let count = 1;
    let char = board[0][i];

    for (let j = 1; j < N; j++) {
      if (board[j][i] === char) {
        count++;
      } else {
        if (count > max) {
          max = count;
        }
        char = board[j][i];
        count = 1;
      }

      if (count > max) max = count;
    }
  }

  return max;
}
