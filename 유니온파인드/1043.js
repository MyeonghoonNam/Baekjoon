const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `10 9
4 1 2 3 4
2 1 5
2 2 6
1 7
1 8
2 7 8
1 9
1 10
2 3 10
1 4`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const [N, M] = input().split(" ").map(Number);
  const parent_table = new Array(N + 1).fill(0).map((_, i) => i);
  const truth = [];
  const party = [];
  let result = M;

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

  const fetchInput = () => {
    const [_, ...truth_person] = input().split(" ").map(Number);
    truth.push(...truth_person);

    for (let i = 0; i < M; i++) {
      const [_, ...particient] = input().split(" ").map(Number);
      party.push(particient);
    }
  };

  const process = () => {
    fetchInput();

    for (let i = 0; i < M; i++) {
      const start = party[i][0];
      for (let j = 1; j < party[i].length; j++) {
        const end = party[i][j];
        unionParent(parent_table, start, end);
      }
    }

    for (let i = 0; i < M; i++) {
      let flag = true;
      for (let j = 0; j < party[i].length; j++) {
        if (!flag) break;

        const start = party[i][j];
        for (let k = 0; k < truth.length; k++) {
          const end = truth[k];
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

    return result;
  };

  return process();
};

console.log(solution());
