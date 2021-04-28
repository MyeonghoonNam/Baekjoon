const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const input = [];
rl.on('line', (line) => {
  // 입력 관리
  input.push(line);
}).on('close', () => {
  // 구현
  const [time, route] = Solution(input);

  console.log(time);

  let result = '';
  for (let i = route.length - 1; i >= 0; i--) {
    if (i === 0) {
      result += route[i];
      break;
    }

    result += `${route[i]} `;
  }

  console.log(result);
  process.exit();

  function Solution(input) {
    const MAX = 100000;
    const [N, K] = input[0].split(' ').map(Number);
    const visited = new Array(MAX + 1).fill(false);
    const history = new Array(MAX + 1).fill(false);
    const route = [];

    const q = [[N, 0]];
    while (q.length > 0) {
      const [pos, time] = q.shift();

      if (pos === K) {
        let idx = pos;
        while (idx !== N) {
          route.push(idx);
          idx = history[idx];
        }

        route.push(N);
        return [time, route];
      }

      if (pos - 1 >= 0 && !visited[pos - 1]) {
        visited[pos - 1] = true;
        history[pos - 1] = pos;
        q.push([pos - 1, time + 1]);
      }

      if (pos + 1 <= MAX && !visited[pos + 1]) {
        visited[pos + 1] = true;
        history[pos + 1] = pos;
        q.push([pos + 1, time + 1]);
      }

      if (pos * 2 <= MAX && !visited[pos * 2]) {
        visited[pos * 2] = true;
        history[pos * 2] = pos;
        q.push([pos * 2, time + 1]);
      }
    }
  }
});
