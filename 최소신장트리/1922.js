const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `6
9
1 2 5
1 3 4
2 3 2
2 4 7
3 4 6
3 5 11
4 5 3
4 6 8
5 6 8`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const findParent = (parent, v) => {
    if (parent[v] !== v) {
      parent[v] = findParent(parent, parent[v]);
    }

    return parent[v];
  };

  const unionParent = (parent, start, end) => {
    start = findParent(parent, start);
    end = findParent(parent, end);

    if (start < end) {
      parent[end] = start;
    } else {
      parent[start] = end;
    }
  };

  const process = () => {
    const N = Number(input());
    const M = Number(input());
    const parent_table = new Array(N + 1);
    const edges = [];
    let result = 0;

    for (let i = 1; i <= N; i++) {
      parent_table[i] = i;
    }

    for (let i = 0; i < M; i++) {
      const [start, end, cost] = input().split(" ").map(Number);
      edges.push({ start, end, cost });
    }

    edges.sort((a, b) => a.cost - b.cost);

    for (let i = 0; i < M; i++) {
      const { start, end, cost } = edges[i];

      if (findParent(parent_table, start) !== findParent(parent_table, end)) {
        unionParent(parent_table, start, end);
        result += cost;
      }
    }

    return result;
  };

  const result = process();
  return result;
};

console.log(solution());
