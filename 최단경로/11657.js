const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `3 4
1 2 4
1 3 3
2 3 -1
3 1 -2`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const [N, M] = input().split(" ").map(Number);
  const edges = [];
  const distance = new Array(N + 1).fill(Infinity);

  for (let i = 0; i < M; i++) {
    const [start, end, time] = input().split(" ").map(Number);
    edges.push({ start, end, time });
  }

  const bellmanFord = (start_node) => {
    distance[start_node] = 0;

    for (let i = 0; i < N; i++) {
      for (let j = 0; j < M; j++) {
        const { start, end, time } = edges[j];

        if (
          distance[start] !== Infinity &&
          distance[end] > distance[start] + time
        ) {
          distance[end] = distance[start] + time;

          if (i === N - 1) return true;
        }
      }
    }

    return false;
  };

  const process = () => {
    const cycle = bellmanFord(1);
    const result = [];

    if (cycle) {
      return -1;
    } else {
      for (let i = 2; i <= N; i++) {
        if (distance[i] === Infinity) {
          result.push(-1);
        } else {
          result.push(distance[i]);
        }
      }
    }

    return result.join("\n");
  };

  const result = process();
  return result;
};

console.log(solution());
