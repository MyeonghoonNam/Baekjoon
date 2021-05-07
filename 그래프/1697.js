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
const visited = new Array(1000001).fill(false);

console.log(Solution());

function Solution() {
  const q = [];
  q.push([N, 0]);
  visited[N] = true;

  while (q.length > 0) {
    const [pos, time] = q.shift();

    if (pos === K) {
      return time;
    }

    if (pos - 1 >= 0 && !visited[pos - 1]) {
      visited[pos - 1] = true;
      q.push([pos - 1, time + 1]);
    }

    if (pos + 1 <= 100000 && !visited[pos + 1]) {
      visited[pos + 1] = true;
      q.push([pos + 1, time + 1]);
    }

    if (pos * 2 <= 100000 && !visited[pos * 2]) {
      visited[pos * 2] = true;
      q.push([pos * 2, time + 1]);
    }
  }
}
