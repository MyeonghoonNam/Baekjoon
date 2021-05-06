const input = [
  '5 5',
  '1 2 3 4 5',
  '5 4 3 2 1',
  '2 3 4 5 6',
  '6 5 4 3 2',
  '1 2 1 2 1',
];

const [N, M] = input.shift().split(' ').map(Number);
const map = Array.from(new Array(N), () => new Array());
const visited = Array.from(new Array(N), () => new Array(M).fill(false));
let result = 0;

for (let i = 0; i < N; i++) {
  map[i] = input.shift().split(' ').map(Number);
}

console.log(Solution());

function Solution() {
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      visited[i][j] = true;
      Dfs(i, j, map[i][j], 1);
      visited[i][j] = false;
      CheckShape(i, j);
    }
  }

  return result;
}

function Dfs(x, y, sumValue, length) {
  if (length >= 4) {
    result = Math.max(result, sumValue);
    return;
  }

  const dx = [-1, 1, 0, 0];
  const dy = [0, 0, -1, 1];

  for (let i = 0; i < 4; i++) {
    const nx = x + dx[i];
    const ny = y + dy[i];

    if (CheckRange(nx, ny) && !visited[nx][ny]) {
      visited[nx][ny] = true;
      Dfs(nx, ny, sumValue + map[nx][ny], length + 1);
      visited[nx][ny] = false;
    }
  }
}

// ㅜ,ㅗ,ㅏ,ㅓ
function CheckShape(x, y) {
  const dx = [
    [0, 0, 0, 1],
    [0, 0, 0, -1],
    [0, 1, 2, 1],
    [0, -1, 0, 1],
  ];
  const dy = [
    [0, 1, 2, 1],
    [0, 1, 2, 1],
    [0, 0, 0, 1],
    [0, 1, 1, 1],
  ];

  for (let i = 0; i < 4; i++) {
    let sumValue = 0;
    let flag = false;

    for (let j = 0; j < 4; j++) {
      const nx = x + dx[i][j];
      const ny = y + dy[i][j];

      if (CheckRange(nx, ny)) {
        sumValue += map[nx][ny];
      } else {
        flag = true;
        break;
      }
    }

    if (!flag) {
      result = Math.max(result, sumValue);
    }
  }
}

function CheckRange(x, y) {
  if (x >= 0 && x < N && y >= 0 && y < M) {
    return true;
  } else {
    return false;
  }
}
