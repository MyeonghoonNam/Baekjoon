const input = ['7 1 2 3 4 5 6 7', '8 1 2 3 5 8 13 21 34'];

const T = input.length;

let arr = [];
let K = 0;
let visited = [];
let choice = [];
let result = '';

for (let i = 0; i < T; i++) {
  arr = input[i].split(' ').map(Number);
  K = arr.shift();
  visited = new Array(K).fill(false);
  choice = [];
  result = '';

  Dfs(0, 0);
  console.log(result);
}

function Dfs(idx, cnt) {
  if (cnt === 6) {
    result += choice.join(' ') + '\n';
    return;
  }

  for (let i = idx; i < K; i++) {
    if (!visited[i]) {
      visited[i] = true;
      choice[cnt] = arr[i];
      Dfs(i, cnt + 1);
      visited[i] = false;
    }
  }
}
