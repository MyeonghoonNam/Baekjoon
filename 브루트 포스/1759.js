const fs = require('fs');
const stdin = (process.platform === 'linux'
  ? fs.readFileSync('/dev/stdin').toString()
  : `4 6
a t c i s w`
).split('\n');

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const [L, C] = input().split(' ').map(Number);
const str = input().split(' ').sort();
const visited = new Array(C).fill(false);
const password = [];
let result = [];

Dfs(0, 0);
console.log(result.join('\n'));

function Dfs(idx, cnt) {
  if (cnt === L) {
    let tmp = password.join('');
    let re1 = tmp.match(/[aeiou]/g) || [];
    let re2 = tmp.match(/[^aeiou]/g) || [];
    if (re1.length >= 1 && re2.length >= 2) {
      result.push(tmp);
    }
    return;
  }

  for (let i = idx; i < C; i++) {
    if (!visited[i]) {
      visited[i] = true;
      password[cnt] = str[i];
      Dfs(i, cnt + 1);
      visited[i] = false;
    }
  }
}
