// const input = ['3 1'];
// const input = ['4 2'];
const input = ['3 3'];

const [N, M] = input[0].split(' ').map(Number);
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
    arr[cnt] = i;
    Dfs(i, cnt + 1);
  }
}
