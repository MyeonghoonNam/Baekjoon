const fs = require('fs');
const stdin = (process.platform === 'linux'
  ? fs.readFileSync('/dev/stdin').toString()
  : `5 17`
).split('\n');

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const [N, K] = input().split(' ').map(Number);
const visited = new Array(100001).fill(false);

console.log(Solution());

function Solution() {
  let q = [[N, 0]];

  visited[N] = true;
  let minTime = Number.MAX_SAFE_INTEGER;
  let count = 0;
  while (q.length > 0) {
    const [pos, curTime] = q.shift();

    if (minTime < curTime) continue;

    visited[pos] = true;

    if (pos === K) {
      minTime = Math.min(minTime, curTime);
      count++;
      continue;
    }

    if (pos + 1 <= 100000 && !visited[pos + 1]) {
      q.push([pos + 1, curTime + 1]);
    }

    if (pos * 2 <= 100000 && !visited[pos * 2]) {
      q.push([pos * 2, curTime + 1]);
    }

    if (pos - 1 >= 0 && !visited[pos - 1]) {
      q.push([pos - 1, curTime + 1]);
    }
  }

  return `${minTime}\n${count}`;
}
