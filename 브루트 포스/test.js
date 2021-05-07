const input = ['3'];

const N = Number(input[0]);
const visited = new Array(N + 1).fill(false);
const result = [];

Dfs(0);

function Dfs(cnt) {
  if (cnt === N) {
    console.log(result.join(' '));
    return;
  }

  for (let i = 1; i <= N; i++) {
    if (!visited[i]) {
      visited[i] = true;
      result[cnt] = i;
      Dfs(cnt + 1);
      visited[i] = false;
    }
  }
}
