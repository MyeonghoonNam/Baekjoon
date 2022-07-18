const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `5 7
M W W W M
1 2 12
1 3 10
4 2 5
5 2 5
2 5 10
3 4 3
5 4 7`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const [N, M] = input().split(" ").map(Number);
  const parent_table = new Array(N + 1).fill(0).map((_, i) => i);
  const edges = [];
  let result = 0;

  const fetchInput = () => {
    const university = input().split(" ");

    for (let i = 0; i < M; i++) {
      const [start, end, dist] = input().split(" ").map(Number);

      if (university[start - 1] !== university[end - 1]) {
        edges.push({ start, end, dist });
      }
    }

    edges.sort((a, b) => a.dist - b.dist);
  };

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

  const kruskal = () => {
    let count = 0; // 현재 최소 스패닝 트리의 간선 수

    edges.forEach(({ start, end, dist }) => {
      const start_parent = findParent(parent_table, start);
      const end_parent = findParent(parent_table, end);

      if (start_parent !== end_parent) {
        unionParent(parent_table, start, end);
        result += dist;
        count++;
      }
    });

    if (count !== N - 1) {
      result = -1;
    }
  };

  const onProcess = () => {
    fetchInput();
    kruskal();
  };

  onProcess();
  return result;
};

console.log(solution());
