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
  const [N, M] = input.shift().split(' ').map(Number);
  const numbers = input
    .shift()
    .split(' ')
    .map(Number)
    .sort((a, b) => a - b);

  const visited = new Array(N).fill(false);
  const arr = [];
  let result = '';

  Dfs(0);
  console.log(result);

  function Dfs(cnt) {
    if (cnt === M) {
      result += arr.join(' ') + '\n';
      return;
    }

    for (let i = 0; i < N; i++) {
      if (!visited[i]) {
        visited[i] = true;
        arr[cnt] = numbers[i];
        Dfs(cnt + 1);
        visited[i] = false;
      }
    }
  }
});
