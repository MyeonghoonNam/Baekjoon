const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `4
1 7
2 6
3 8
4 9`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const N = Number(input());
  const taste = [];
  const visited = new Array(N).fill(false);
  let result = Number.MAX_SAFE_INTEGER;

  for (let i = 0; i < N; i++) {
    taste.push(input().split(" ").map(Number));
  }

  const dfs = (idx, cnt) => {
    if (cnt >= 1) {
      const selected = [];

      for (let i = 0; i < N; i++) {
        if (visited[i] === true) {
          selected.push(taste[i]);
        }
      }

      let totalS = 1;
      let totalB = 0;

      for (let i = 0; i < selected.length; i++) {
        const [S, B] = selected[i];

        totalS *= S;
        totalB += B;
      }

      result = Math.min(result, Math.abs(totalS - totalB));
    }

    for (let i = idx; i < N; i++) {
      if (visited[i] === false) {
        visited[i] = true;
        dfs(i, cnt + 1);
        visited[i] = false;
      }
    }
  };

  dfs(0, 0);

  return result;
};

console.log(solution());
