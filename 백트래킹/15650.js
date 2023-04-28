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
  const visited = new Array(N).fill(false);
  const selected = [];
  const result = [];

  const dfs = (idx, cnt) => {
    if (cnt === M) {
      result.push(selected.join(" "));
      return;
    }

    for (let i = idx; i < N; i++) {
      if (visited[i]) continue;

      visited[i] = true;
      selected.push(numbers[i]);
      dfs(i, cnt + 1);
      selected.pop();
      visited[i] = false;
    }
  };

  dfs(0, 0);

  return result.join("\n");
};

console.log(solution());
