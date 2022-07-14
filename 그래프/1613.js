const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `5 5
1 2
1 3
2 3
3 4
2 4
3
1 5
2 4
3 1`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const [N, K] = input().split(" ").map(Number);
  const history = Array.from(new Array(N + 1), () => new Array(N + 1).fill(0));

  for (let i = 0; i < K; i++) {
    const [from, to] = input().split(" ").map(Number);
    history[from][to] = -1;
    history[to][from] = 1;
  }

  // 플로이드
  for (let k = 1; k <= N; k++) {
    for (let i = 1; i <= N; i++) {
      for (let j = 1; j <= N; j++) {
        if (history[i][j] === 0) {
          if (history[i][k] === 1 && history[k][j] === 1) history[i][j] = 1;
          else if (history[i][k] === -1 && history[k][j] === -1)
            history[i][j] = -1;
        }
      }
    }
  }

  const S = Number(input());
  const result = [];

  for (let i = 0; i < S; i++) {
    const [from, to] = input().split(" ").map(Number);
    result.push(history[from][to]);
  }

  return result.join("\n");
};

console.log(solution());
