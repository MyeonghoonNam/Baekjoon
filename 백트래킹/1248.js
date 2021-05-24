const fs = require('fs');
const stdin = (
  process.platform === 'linux'
    ? fs.readFileSync('/dev/stdin').toString()
    : `4
-+0++++--+`
).split('\n');

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

Solution();

function Solution() {
  const N = Number(input());
  const operator = Array.from(new Array(N), () => new Array());
  const selected = new Array(10).fill(0);

  const inputArr = input();
  for (let i = 0; i < N; i++) {
    for (let j = i; j < N; j++) {
      operator[i][j] = inputArr[j];
    }
  }

  const Check = (idx) => {
    let sum = 0;

    for (let i = idx; i >= 0; i--) {
      sum += selected[i];

      if (operator[i][idx] === '+' && sum <= 0) return false;
      if (operator[i][idx] === '-' && sum >= 0) return false;
      if (operator[i][idx] === '0' && sum !== 0) return false;
    }

    return true;
  };

  const Dfs = (cnt) => {
    if (cnt === N) {
      for (let i = 0; i < cnt; i++) {
        process.stdout.write(selected[i] + ' ');
      }

      return;
    }

    for (let i = -10; i <= 10; i++) {
      selected[cnt] = i;
      if (Check(cnt)) {
        Dfs(cnt + 1);
      }
    }
  };

  Dfs(0);
}
