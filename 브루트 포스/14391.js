const fs = require('fs');
const stdin = (
  process.platform === 'linux'
    ? fs.readFileSync('/dev/stdin').toString()
    : `4 3
001
010
111
100`
).split('\n');

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

console.log(Solution());

function Solution() {
  const [N, M] = input().split(' ').map(Number);
  const map = [];

  for (let i = 0; i < N; i++) {
    map[i] = input().split('').map(Number);
  }

  let result = 0;
  for (let b = 0; b < 1 << (N * M); b++) {
    let sum = 0;

    for (let i = 0; i < N; i++) {
      let now = 0;

      for (let j = 0; j < M; j++) {
        const idx = i * M + j;

        if ((b & (1 << idx)) === 0) {
          now = now * 10 + map[i][j];
        } else {
          sum += now;
          now = 0;
        }
      }

      sum += now;
    }

    for (let j = 0; j < M; j++) {
      let now = 0;

      for (let i = 0; i < N; i++) {
        const idx = i * M + j;

        if ((b & (1 << idx)) != 0) {
          now = now * 10 + map[i][j];
        } else {
          sum += now;
          now = 0;
        }
      }

      sum += now;
    }

    if (result < sum) result = sum;
  }

  return result;
}
