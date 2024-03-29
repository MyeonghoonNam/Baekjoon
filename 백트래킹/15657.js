const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `4 2
9 8 7 1`
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

  const selected = [];
  const result = [];

  const dfs = (idx, cnt) => {
    if (cnt === M) {
      result.push(selected.join(" "));
      return;
    }

    for (let i = idx; i < N; i++) {
      selected[cnt] = numbers[i];
      dfs(i, cnt + 1);
    }
  };

  dfs(0, 0);

  return result.join("\n");
};

console.log(solution());
