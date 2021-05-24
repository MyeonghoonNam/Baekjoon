const fs = require('fs');
const stdin = (
  process.platform === 'linux'
    ? fs.readFileSync('/dev/stdin').toString()
    : `2
< >`
).split('\n');

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

console.log(Solution());

function Solution() {
  const K = Number(input());
  const operator = input().split(' ');
  const permutaion = [];
  const result = [];

  const numArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const checked = new Array(10).fill(false);

  const check = (idx, c) => {
    if (c === '<') {
      if (permutaion[idx] < permutaion[idx + 1]) {
        return true;
      } else {
        return false;
      }
    } else if (c === '>') {
      if (permutaion[idx] > permutaion[idx + 1]) {
        return true;
      } else {
        return false;
      }
    }
  };

  const calculate = () => {
    for (let i = 0; i < K; i++) {
      if (check(i, operator[i]) === false) return false;
    }

    return true;
  };

  const dfs = (cnt) => {
    if (cnt === K + 1) {
      if (calculate()) {
        let num = '';
        permutaion.forEach((n) => {
          num += String(n);
        });

        result.push(num);
      }

      return;
    }

    for (let i = 0; i < numArr.length; i++) {
      if (!checked[i]) {
        checked[i] = true;
        permutaion.push(numArr[i]);
        dfs(cnt + 1);
        permutaion.pop();
        checked[i] = false;
      }
    }
  };

  dfs(0);

  result.sort((a, b) => a - b);

  return `${result[result.length - 1]}\n${result[0]}`;
}
