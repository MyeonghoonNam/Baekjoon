const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `6 3
1 2
2 3
3 4
6 5
1 2
2 3
3 4
4 5
5 6
6 6
1 2
2 3
1 3
4 5
5 6
6 4
0 0`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const result = [];
  let testCase = 1;

  while (true) {
    const [N, M] = input().split(" ").map(Number);

    if (N === 0 && M === 0) break;

    const graph = Array.from(new Array(N + 1), () => []);
    const visited = new Array(N + 1).fill(false);
    let count = 0;

    for (let i = 0; i < M; i++) {
      const [start, end] = input().split(" ").map(Number);

      graph[start].push(end);
      graph[end].push(start);
    }

    const isCycle = (current, prev) => {
      visited[current] = true;

      for (let i = 0; i < graph[current].length; i++) {
        const next = graph[current][i];

        if (!visited[next]) {
          if (isCycle(next, current)) {
            return true;
          }
        } else if (next !== prev) {
          return true;
        }
      }

      return false;
    };

    for (let i = 1; i <= N; i++) {
      if (isCycle(i, 0)) continue;

      count += 1;
    }

    if (count === 0) {
      result.push(`Case ${testCase}: No trees.`);
    } else if (count === 1) {
      result.push(`Case ${testCase}: There is one tree.`);
    } else {
      result.push(`Case ${testCase}: A forest of ${count} trees.`);
    }

    testCase += 1;
  }

  return result.join("\n");
};

console.log(solution());
