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
  const numbers = input[1].split(' ').map(Number);
  const visited = new Array(N).fill(false);
  const result = [];
  let max = Number.MIN_SAFE_INTEGER;

  Dfs(0);
  console.log(max);

  function Dfs(cnt) {
    if (cnt === N) {
      let sum = 0;
      for (let i = 0; i < N - 1; i++) {
        sum += Math.abs(result[i] - result[i + 1]);
      }

      if (max < sum) {
        max = sum;
      }

      return;
    }

    for (let i = 0; i < N; i++) {
      if (!visited[i]) {
        visited[i] = true;
        result[cnt] = numbers[i];
        Dfs(cnt + 1);
        visited[i] = false;
      }
    }
  }
});
