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

  Dfs(0, 0);
  console.log(result);

  function Dfs(idx, cnt) {
    if (cnt === M) {
      result += arr.join(' ') + '\n';
      return;
    }

    let lastNum = 0;
    for (let i = idx; i < N; i++) {
      if (numbers[i] !== lastNum) {
        arr[cnt] = numbers[i];
        lastNum = arr[cnt];
        Dfs(i, cnt + 1);
      }
    }
  }
});
