const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `6 5
0 1
1 2
1 3
0 3
4 5`
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
    const [n, m] = input().split(" ").map(Number);
    const parent_table = [];

    for (let i = 0; i < n; i++) {
      parent_table[i] = i;
    }

    let cycle = false;
    for (let i = 0; i < m; i++) {
      const [start, end] = input().split(" ").map(Number);

      if (
        findParent(parent_table, parent_table[start]) ===
        findParent(parent_table, parent_table[end])
      ) {
        cycle = true;
      } else {
        unionParent(parent_table, start, end);
      }

      if (cycle) return i + 1;
    }

    return 0;
  };

  const result = process();
  return result;
};

console.log(solution());
