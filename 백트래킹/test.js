// const input = ['3 1'];
// const input = ['4 2'];
const input = ['3 3'];

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
