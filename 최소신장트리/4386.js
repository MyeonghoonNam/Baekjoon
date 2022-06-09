const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `3
1.0 1.0
2.0 2.0
2.0 4.0`
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

  const getDistance = (a, b) => {
    return Number(
      Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2)).toFixed(2)
    );
  };

  const process = () => {
    const N = Number(input());
    const parent_table = new Array();
    const coords = [];
    const edges = [];
    let result = 0;

    for (let i = 0; i < N; i++) {
      parent_table[i] = i;
    }

    for (let i = 0; i < N; i++) {
      const [x, y] = input().split(" ").map(Number);
      coords.push({ x, y });
    }

    for (let i = 0; i < N - 1; i++) {
      const point1 = coords[i];

      for (let j = i + 1; j < N; j++) {
        const point2 = coords[j];
        edges.push({ start: i, end: j, cost: getDistance(point1, point2) });
      }
    }

    edges.sort((a, b) => a.cost - b.cost);

    for (let i = 0; i < edges.length; i++) {
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
