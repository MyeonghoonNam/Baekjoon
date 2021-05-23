const fs = require('fs');
const stdin = (
  process.platform === 'linux'
    ? fs.readFileSync('/dev/stdin').toString()
    : `8
0 5 4 5 4 5 4 5
4 0 5 1 2 3 4 5
9 8 0 1 2 3 1 2
9 9 9 0 9 9 9 9
1 1 1 1 0 1 1 1
8 7 6 5 4 0 3 2
9 1 9 1 9 1 0 9
6 5 4 3 2 1 9 0`
).split('\n');

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

console.log(Solution());

function Solution() {
  const N = Number(input());
  const map = new Array(N);
  const selected = new Array(N).fill(false);
  let result = Number.MAX_SAFE_INTEGER;

  for (let i = 0; i < N; i++) {
    map[i] = input().split(' ').map(Number);
  }

  const dfs = (idx, cnt) => {
    if (cnt === parseInt(N / 2)) {
      let start = 0;
      let link = 0;

      for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
          if (i === j) continue;

          if (selected[i] && selected[j]) {
            start += map[i][j];
          } else if (!selected[i] && !selected[j]) {
            link += map[i][j];
          }
        }
      }

      const temp = Math.abs(start - link);
      if (temp < result) result = temp;

      return;
    }

    for (let i = idx; i < N; i++) {
      if (!selected[i]) {
        selected[i] = true;
        dfs(i + 1, cnt + 1);
        selected[i] = false;
      }
    }
  };

  dfs(0, 0);

  return result;
}
