const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `3
3
0 1 0
1 0 1
0 1 0
1 2 3`
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

    for (let i = 1; i <= N; i++) {
      parent_table[i] = i;
    }

    for (let i = 1; i <= N; i++) {
      const connect_info = input().split(" ").map(Number);

      for (let j = 1; j <= N; j++) {
        const flag = connect_info[j - 1];

        if (flag === 1) {
          unionParent(parent_table, i, j);
        }
      }
    }

    const plan = input().split(" ").map(Number);
    const start_city = parent_table[plan[0]];

    for (let i = 1; i < M; i++) {
      if (start_city !== parent_table[plan[i]]) return "NO";
    }

    return "YES";
  };

  const result = process();
  return result;
};

console.log(solution());
