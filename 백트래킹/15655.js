const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `4 4
1231 1232 1233 1234`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const [N, M] = input().split(" ").map(Number);
  const numbers = input()
    .split(" ")
    .map(Number)
    .sort((a, b) => a - b);

  const visited = new Array(N).fill(false);
  const reuslt = [];

  const dfs = (idx, cnt) => {
    if (cnt === M) {
      const selected = [];

      for (let i = 0; i < N; i++) {
        if (visited[i]) {
          selected.push(numbers[i]);
        }
      }

      reuslt.push(selected.join(" "));

      return;
    }

    for (let i = idx; i < N; i++) {
      if (visited[i]) continue;

      visited[i] = true;
      dfs(i, cnt + 1);
      visited[i] = false;
    }
  };

  dfs(0, 0);

  return reuslt.join("\n");
};

console.log(solution());
