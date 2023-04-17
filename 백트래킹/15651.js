const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `4 2`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const [N, M] = input().split(" ").map(Number);
  const numbers = new Array(N).fill(0).map((_, i) => i + 1);
  const selected = [];
  const result = [];

  const dfs = (cnt) => {
    if (cnt === M) {
      result.push(selected.join(" "));
      return;
    }

    for (let i = 0; i < N; i++) {
      selected[cnt] = numbers[i];
      dfs(cnt + 1);
    }
  };

  dfs(0);

  return result.join("\n");
};

console.log(solution());
