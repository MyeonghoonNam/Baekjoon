const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const input = [];

rl.on('line', (line) => {
  input.push(line);
}).on('close', () => {
  const n = Number(input.shift());
  const arr = input.shift().split('');
  const map = [];

  let idx = 0;

  for (let i = 0; i < n; i++) {
    map.push(new Array(n).fill(null));
    for (let j = i; j < n; j++) {
      map[i][j] = arr[idx++];
    }
  }

  const visit = [];

  dfs(0);

  function dfs(cnt) {
    if (cnt === n) {
      console.log(visit.join(' '));
      process.exit();
    }
    for (let i = 0; i < 21; i++) {
      visit.push(i - 10);

      if (solution()) {
        dfs(cnt + 1);
      }
      visit.pop();
    }
  }

  function solution() {
    for (let i = 0; i < visit.length; i++) {
      let sum = 0;
      for (let j = i; j < visit.length; j++) {
        sum += visit[j];
        let check = sum === 0 ? '0' : sum < 0 ? '-' : '+';
        if (check !== map[i][j]) return false;
      }
    }
    return true;
  }
  process.exit();
});
