const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `7 1 2 3 4 5 6 7
8 1 2 3 5 8 13 21 34
0`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const result = [];

  while (true) {
    const [K, ...S] = input().split(" ").map(Number);

    if (K === 0) break;

    const MAX_SELECTED_COUNT = 6;
    const visited = new Array(K).fill(false);

    const dfs = (idx, cnt) => {
      if (cnt === MAX_SELECTED_COUNT) {
        const selected = [];

        for (let i = 0; i < K; i++) {
          if (visited[i] === true) {
            selected.push(S[i]);
          }
        }

        result.push(selected.join(" "));
        return;
      }

      for (let i = idx; i < K; i++) {
        if (visited[i] === false) {
          visited[i] = true;
          dfs(i, cnt + 1);
          visited[i] = false;
        }
      }
    };

    dfs(0, 0);
    result.push("");
  }

  result.pop();

  return result.join("\n");
};

console.log(solution());
