const fs = require("fs");
const stdin = (
  process.platform === "linux" ? fs.readFileSync("/dev/stdin").toString() : `3`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const N = Number(input());
  const numbers = new Array(N).fill(0).map((_, i) => i + 1);
  const visited = new Array(N).fill(false);
  const selected = [];
  const result = [];

  const dfs = (cnt) => {
    if (cnt === numbers.length) {
      result.push(selected.join(" "));
      return;
    }

    for (let i = 0; i < N; i++) {
      if (visited[i]) continue;

      selected.push(numbers[i]);
      visited[i] = true;
      dfs(cnt + 1);
      selected.pop();
      visited[i] = false;
    }
  };

  dfs(0);

  return result.join("\n");
};

console.log(solution());
