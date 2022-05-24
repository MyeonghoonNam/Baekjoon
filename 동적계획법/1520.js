const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `4 5
50 45 37 32 30
35 50 40 20 25
30 30 25 17 28
27 24 22 15 10`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

/**
 * 이동가능한 방향은 상,하,좌,우 4방향이며 항상 자신보다 낮은 지점으로만 이동가능
 * 완전 탐색으로 비교할 경우 4방향에 대해 최악의 경우 4^(500*500)의 연산이 필요하므로 DP활용하여 시간복잡도 개선
 *
 * 요구사항: (0, 0)에서 (N-1, M-1)까지 이동가능한 경로의 경우의 수 도출
 * DP[a][b] = c
 * (a, b)에서 (N-1, M-1)까지 c개의 경로에 대한 경우의 수
 */

const solution = () => {
  const [N, M] = input().split(" ").map(Number);
  const MAP = Array.from(new Array(N), () => new Array(M));
  const DP = Array.from(new Array(N), () => new Array(M).fill(-1));

  const dx = [-1, 1, 0, 0];
  const dy = [0, 0, -1, 1];

  const dfs = (x, y) => {
    if (x === N - 1 && y === M - 1) return 1;
    if (DP[x][y] !== -1) return DP[x][y];

    DP[x][y] = 0;

    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];

      if (!checkMapRange(nx, ny)) continue;

      if (MAP[nx][ny] < MAP[x][y]) {
        DP[x][y] = DP[x][y] + dfs(nx, ny);
      }
    }

    return DP[x][y];
  };

  const checkMapRange = (x, y) => {
    if (x >= 0 && y >= 0 && x < N && y < M) return true;
    else return false;
  };

  for (let i = 0; i < N; i++) {
    const row = input().split(" ").map(Number);
    MAP[i] = row;
  }

  const result = dfs(0, 0);
  return result;
};

console.log(solution());
