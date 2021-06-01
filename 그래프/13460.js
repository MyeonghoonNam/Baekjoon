const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];
let board = [];

rl.on('line', function (line) {
  input.push(line);
}).on('close', function () {
  let [N, M] = input[0].split(' ');
  N -= 0;
  M -= 0;
  for (let i = 1; i <= N; i++) {
    board.push(input[i].split(''));
  }
  let R, B;

  for (let y = 0; y < N; y++) {
    for (let x = 0; x < M; x++) {
      if (board[y][x] === 'B') {
        board[y][x] = '.';
        B = [y, x];
      } else if (board[y][x] === 'R') {
        board[y][x] = '.';
        R = [y, x];
      }
    }
  }
  let queue = [[...B, ...R, 0]];
  let idx = 0;
  const dy = [1, -1, 0, 0];
  const dx = [0, 0, -1, 1];
  while (idx < queue.length) {
    let [by, bx, ry, rx, level] = queue[idx];
    idx++;
    if (level >= 10) {
      break;
    }
    let meetRed = false;
    for (let i = 0; i < 4; i++) {
      let nby = by;
      let nbx = bx;
      let goalRed = false;
      while (
        !(nby < 0 || nby >= N || nbx < 0 || nbx >= M) &&
        board[nby][nbx] === '.' &&
        !(nby === ry && nbx === rx)
      ) {
        nby += dy[i];
        nbx += dx[i];
      }
      if (board[nby][nbx] === 'O') {
        continue;
      } else if (nby === ry && nbx === rx) {
        meetRed = true;
      }
      nby -= dy[i];
      nbx -= dx[i];

      let nry = ry;
      let nrx = rx;
      while (
        !(nry < 0 || nry >= N || nrx < 0 || nrx >= M) &&
        board[nry][nrx] === '.' &&
        !(nby === nry && nbx === nrx)
      ) {
        nry += dy[i];
        nrx += dx[i];
      }
      if (board[nry][nrx] === 'O') {
        goalRed = true;
      }
      if (!goalRed) {
        nry -= dy[i];
        nrx -= dx[i];
      }

      if (meetRed) {
        while (
          !(nby < 0 || nby >= N || nbx < 0 || nbx >= M) &&
          board[nby][nbx] === '.' &&
          !(nby === nry && nbx === nrx)
        ) {
          nby += dy[i];
          nbx += dx[i];
        }
        if (board[nby][nbx] === 'O') {
          continue;
        }
        nby -= dy[i];
        nbx -= dx[i];
      }
      if (goalRed) {
        console.log(level + 1);
        return;
      }
      if (nby === by && nbx === bx && nrx === rx && nry === ry) continue;
      queue.push([nby, nbx, nry, nrx, level + 1]);
    }
  }
  console.log(-1);
});
