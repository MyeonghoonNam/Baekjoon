'use strict';

const fs = require('fs');
const stdin = (
  process.platform === 'linux'
    ? fs.readFileSync('/dev/stdin').toString()
    : `3 3
1 2 2
3 1 3
2 3 2
1 3`
).split('\n');

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

function Solution() {
  const [N, M] = input().split(' ').map(Number);
  const graph = Array.from(new Array(N + 1), () => new Array());
  let visited;
  let maxCost = 0;

  for (let i = 1; i <= M; i++) {
    const [to, from, cost] = input().split(' ').map(Number);

    graph[to].push([from, cost]);
    graph[from].push([to, cost]);

    maxCost = Math.max(maxCost, cost);
  }

  const [start, end] = input().split(' ').map(Number);

  const bfs = (curCost) => {
    const queue = [];
    queue.push(start);
    visited[start] = true;

    while (queue.length > 0) {
      const curLand = queue.shift();

      if (curLand === end) return true;

      for (let i = 0; i < graph[curLand].length; i++) {
        const nextLand = graph[curLand][i][0];
        const nextLandCost = graph[curLand][i][1];

        if (!visited[nextLand] && curCost <= nextLandCost) {
          queue.push(nextLand);
          visited[nextLand] = true;
        }
      }
    }
  };

  const binarySearch = () => {
    let low = 0;
    let high = maxCost;

    while (low <= high) {
      visited = new Array(N + 1).fill(false);
      const mid = Math.floor((low + high) / 2);

      if (bfs(mid) === true) low = mid + 1;
      else high = mid - 1;
    }

    return high;
  };

  return binarySearch();
}

console.log(Solution());
