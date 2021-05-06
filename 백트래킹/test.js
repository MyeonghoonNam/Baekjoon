// const input = ['3 1'];
const input = ['4 2'];
// const input = ['4 4'];

const [N, M] = input[0].split(' ').map(Number);
const visited = new Array(N + 1).fill(false);
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
    if (!visited[i]) {
      visited[i] = true;
      arr[cnt] = i;
      Dfs(i + 1, cnt + 1);
      visited[i] = false;
    }
  }
}
