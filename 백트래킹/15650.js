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
  const [N, M] = input[0].split(' ').map(Number);
  const visited = new Array(N + 1).fill(false);
  const arr = [];
  let result = '';

  Dfs(1, 0);
  console.log(result);

  function Dfs(idx, cnt) {
    if (cnt === M) {
      result += arr.join(' ') + '\n';
      return;
    }

    for (let i = idx; i <= N; i++) {
      if (!visited[i]) {
        visited[i] = true;
        arr[cnt] = i;
        Dfs(i + 1, cnt + 1);
        visited[i] = false;
      }
    }
  }
});
