const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `4 5
1 1
1 1
1 2
1 3
1 4
2 4 1`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const findParent = (parent, vertex) => {
    if (parent[vertex] !== vertex) {
      parent[vertex] = findParent(parent, parent[vertex]);
    }

    return parent[vertex];
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
    const [N, M] = input().split(" ").map(Number);
    const parent_table = new Array(N + 1).fill(0).map((_, i) => i);
    const [truth_count, ...truth_person] = input().split(" ").map(Number);
    let result = M;

    for (let i = 0; i < M; i++) {
      const [particient_count, ...particient] = input().split(" ").map(Number);

      const start = particient[0];
      for (let j = 1; j < particient_count; j++) {
        const end = particient[j];
        unionParent(parent_table, start, end);
      }

      let flag = true;
      for (let j = 0; j < particient_count; j++) {
        if (!flag) break;

        const start = particient[j];
        for (let k = 0; k < truth_count; k++) {
          const end = truth_person[k];
          if (
            findParent(parent_table, start) === findParent(parent_table, end)
          ) {
            flag = false;
            break;
          }
        }
      }

      if (!flag) result--;
    }
    console.log(parent_table);
    return result;
  };

  return process();
};

console.log(solution());
