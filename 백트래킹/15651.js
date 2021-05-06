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
  const arr = [];
  let result = '';

  Dfs(0);
  console.log(result);

  function Dfs(cnt) {
    if (cnt === M) {
      result += arr.join(' ') + '\n';
      return;
    }

    for (let i = 1; i <= N; i++) {
      arr[cnt] = i;
      Dfs(cnt + 1);
    }
  }
});
