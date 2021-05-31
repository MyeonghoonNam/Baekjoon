// 'use strict';

// const fs = require('fs');
// const stdin = (
//   process.platform === 'linux'
//     ? fs.readFileSync('/dev/stdin').toString()
//     : `2 4
// CAAB
// ADCB`
// ).split('\n');

// const input = (() => {
//   let line = 0;
//   return () => stdin[line++];
// })();

// console.log(Solution());

// function Solution() {
//   const [R, C] = input().split(' ').map(Number);

//   const map = new Array(R);
//   const visited = new Array(26).fill(false);
//   let result = 1;

//   for (let i = 0; i < R; i++) {
//     map[i] = input().split('');
//   }

//   const dx = [-1, 1, 0, 0];
//   const dy = [0, 0, -1, 1];

//   const checkRange = (x, y) => {
//     if (x >= 0 && x < R && y >= 0 && y < C) {
//       return true;
//     } else {
//       return false;
//     }
//   };

//   const dfs = (pos, cnt) => {
//     const [x, y] = pos;

//     for (let i = 0; i < 4; i++) {
//       const nx = x + dx[i];
//       const ny = y + dy[i];

//       if (
//         checkRange(nx, ny) &&
//         !visited[map[nx][ny].charCodeAt(0) - 'A'.charCodeAt(0)]
//       ) {
//         visited[map[nx][ny].charCodeAt(0) - 'A'.charCodeAt(0)] = true;
//         dfs([nx, ny], cnt + 1);
//         visited[map[nx][ny].charCodeAt(0) - 'A'.charCodeAt(0)] = false;
//       } else {
//         result = Math.max(result, cnt);
//       }
//     }
//   };

//   const pos = [0, 0];
//   visited[map[0][0].charCodeAt(0) - 'A'.charCodeAt(0)] = true;
//   dfs(pos, 1);

//   return result;
// }
'use strict';

const fs = require('fs');
const stdin = (
  process.platform === 'linux'
    ? fs.readFileSync('/dev/stdin').toString()
    : `2 4
CAAB
ADCB`
).split('\n');

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

console.log(Solution());

function Solution() {
  const [R, C] = input().split(' ').map(Number);

  const map = new Array(R);
  const visited = new Array(26).fill(false);
  let result = 1;

  for (let i = 0; i < R; i++) {
    map[i] = input().split('');
  }

  const dx = [-1, 1, 0, 0];
  const dy = [0, 0, -1, 1];

  const checkRange = (x, y) => {
    if (x >= 0 && x < R && y >= 0 && y < C) {
      return true;
    } else {
      return false;
    }
  };

  const dfs = (pos, cnt) => {
    const [x, y] = pos;

    result = Math.max(result, cnt);

    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];

      if (
        checkRange(nx, ny) &&
        !visited[map[nx][ny].charCodeAt(0) - 'A'.charCodeAt(0)]
      ) {
        visited[map[nx][ny].charCodeAt(0) - 'A'.charCodeAt(0)] = true;
        dfs([nx, ny], cnt + 1);
        visited[map[nx][ny].charCodeAt(0) - 'A'.charCodeAt(0)] = false;
      }
    }
  };

  const pos = [0, 0];
  visited[map[0][0].charCodeAt(0) - 'A'.charCodeAt(0)] = true;
  dfs(pos, 1);

  return result;
}
