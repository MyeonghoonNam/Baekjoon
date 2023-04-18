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

  const visited = new Array(N).fill(false);
  const selected = [];
  const result = [];

  const dfs = (cnt) => {
    if (cnt === M) {
      result.push(selected.join(" "));
      return;
    }

    for (let i = 0; i < N; i++) {
      if (visited[i]) continue;

      visited[i] = true;
      selected.push(numbers[i]);
      dfs(cnt + 1);
      visited[i] = false;
      selected.pop();
    }
  };

  dfs(0);

  return result.join("\n");
};

console.log(solution());
