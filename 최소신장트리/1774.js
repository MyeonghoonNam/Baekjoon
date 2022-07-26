const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `4 1
1 1
3 1
2 3
4 3
1 4`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const [N, M] = input().split(" ").map(Number);
  const parent_table = [];
  const coordinates = [];
  const connect = [];
  const edges = [];
  let result = 0;

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

  const fetchInput = () => {
    for (let i = 0; i < N + 1; i++) {
      parent_table[i] = i;
    }

    for (let i = 0; i < N; i++) {
      const [x, y] = input().split(" ").map(Number);
      coordinates.push({ x, y });
    }

    for (let i = 0; i < M; i++) {
      const [start, end] = input().split(" ").map(Number);
      connect.push({ start, end });
    }
  };

  const getDistance = (x1, y1, x2, y2) => {
    const dist = Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
    return dist;
  };

  const kruskal = () => {
    for (let i = 0; i < M; i++) {
      const { start, end } = connect[i];

      if (findParent(parent_table, start) !== findParent(parent_table, end)) {
        unionParent(parent_table, start, end);
      }
    }

    for (let i = 0; i < N - 1; i++) {
      const { x: x1, y: y1 } = coordinates[i];

      for (let j = i + 1; j < N; j++) {
        const { x: x2, y: y2 } = coordinates[j];
        const dist = getDistance(x1, y1, x2, y2);

        edges.push({ start: i + 1, end: j + 1, dist });
      }
    }

    edges.sort((a, b) => a.dist - b.dist);

    for (let i = 0; i < edges.length; i++) {
      const { start, end, dist } = edges[i];

      if (findParent(parent_table, start) !== findParent(parent_table, end)) {
        unionParent(parent_table, start, end);
        result += dist;
      }
    }

    result = result.toFixed(2);
  };

  const onProcess = () => {
    fetchInput();
    kruskal();
  };

  onProcess();
  return result;
};

console.log(solution());
