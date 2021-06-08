'use strict';

const fs = require('fs');
const stdin = (
  process.platform === 'linux'
    ? fs.readFileSync('/dev/stdin').toString()
    : `3 4
0000
0010
0000
1001
1011
1001`
).split('\n');

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

console.log(Solution());

function Solution() {
  const [N, M] = input().split(' ').map(Number);

  const A = [];
  const B = [];

  let result = 0;

  for (let i = 0; i < N; i++) {
    A[i] = input().split('').map(Number);
  }

  for (let i = 0; i < N; i++) {
    B[i] = input().split('').map(Number);
  }

  const isSame = () => {
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < M; j++) {
        if (A[i][j] !== B[i][j]) return false;
      }
    }

    return true;
  };

  const reverse = (x, y) => {
    for (let i = x; i < x + 3; i++) {
      for (let j = y; j < y + 3; j++) {
        A[i][j] = A[i][j] ^ 1;
      }
    }
  };

  if (N < 3 || M < 3) {
    if (isSame()) return result;
    else {
      result = -1;
      return result;
    }
  } else {
    for (let i = 0; i <= N - 3; i++) {
      for (let j = 0; j <= M - 3; j++) {
        if (A[i][j] !== B[i][j]) {
          reverse(i, j);
          result++;
        }
      }
    }
  }

  if (!isSame()) {
    result = -1;
    return result;
  }

  return result;
}
