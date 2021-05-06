// const input = ['3 1', '4 4 2'];
const input = ['4 2', '9 7 9 1'];
// const input = ['4 4', '1 1 1 1'];

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
    if (!visited[i] && numbers[i] !== lastNum) {
      visited[i] = true;
      arr[cnt] = numbers[i];
      lastNum = arr[cnt];
      Dfs(i + 1, cnt + 1);
      visited[i] = false;
    }
  }
}
