// const input = ['3 1', '4 5 2'];
// const input = ['4 2', '9 8 7 1'];
const input = ['4 4', '1231 1232 1233 1234'];

const [N, M] = input.shift().split(' ').map(Number);
const numbers = input
  .shift()
  .split(' ')
  .map(Number)
  .sort((a, b) => a - b);

const visited = new Array(N).fill(false);
const arr = [];
let result = '';

Dfs(0);
console.log(result);

function Dfs(cnt) {
  if (cnt === M) {
    result += arr.join(' ') + '\n';
    return;
  }

  for (let i = 0; i < N; i++) {
    if (!visited[i]) {
      visited[i] = true;
      arr[cnt] = numbers[i];
      Dfs(cnt + 1);
      visited[i] = false;
    }
  }
}
