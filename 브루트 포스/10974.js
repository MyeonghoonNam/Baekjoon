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
  const N = Number(input[0]);
  const visited = new Array(N + 1).fill(false);
  const result = [];

  Dfs(0);

  function Dfs(cnt) {
    if (cnt === N) {
      console.log(result.join(' '));
      return;
    }

    for (let i = 1; i <= N; i++) {
      if (!visited[i]) {
        visited[i] = true;
        result[cnt] = i;
        Dfs(cnt + 1);
        visited[i] = false;
      }
    }
  }
});
