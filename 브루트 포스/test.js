const input = ['4', '0 10 15 20', '5 0 9 10', '6 13 0 12', '8 8 9 0'];

const N = Number(input.shift());
const visited = new Array(N).fill(false);
let startCity = 0;
let min = Number.MAX_SAFE_INTEGER;
const map = new Array(N);
for (let i = 0; i < N; i++) {
  map[i] = input[i].split(' ').map(Number);
}

Solution();

function Solution() {
  for (let i = 0; i < N; i++) {
    startCity = i;
    visited[i] = true;
    Dfs(i, 0, 0);
    visited[i] = false;
  }

  console.log(min);
}

function Dfs(cur, cnt, cost) {
  if (cnt === N - 1) {
    if (map[cur][startCity]) {
      min = Math.min(min, cost + map[cur][startCity]);
      return;
    }
  }

  for (let i = 0; i < N; i++) {
    if (!visited[i] && map[cur][i]) {
      visited[i] = true;
      Dfs(i, cnt + 1, cost + map[cur][i]);
      visited[i] = false;
    }
  }
}
