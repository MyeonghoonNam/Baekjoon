const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `4
S S S T
X X X X
X X X X
T T T X`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

/**
 * 선생님은 상,하,좌,우 4가지 방햐에 대하여 장애물에 막혀있지 않다면 무한대로 학생 감시 가능
 * 선생님 T, 학생 S, 장애물 O
 * 학생들은 복도의 빈 칸 중에서 장애물을 정확히 3개 설치
 *
 * 요구사항 : 학생들이 장애물 3개를 설치했을 때 감시를 피할 수 있는지에 대한 여부 도출
 *
 * 1. 모든 빈 칸에 대해 장애물 3개를 설치하는 경우의 수를 모두 탐색
 * 2. 1번을 위해 백트래킹을 활용한 dfs로 구현
 * 3. 장애물을 3개 세운 후 선생님의 감시활동 구현
 */
const solution = () => {
  const N = Number(input());
  const map = [];
  const teacher_position = [];
  let result = false;

  for (let i = 0; i < N; i++) {
    const data = input().split(" ");
    map.push(data);

    for (let j = 0; j < N; j++) {
      if (data[j] === "T") {
        teacher_position.push({ x: i, y: j });
      }
    }
  }

  const dx = [-1, 1, 0, 0];
  const dy = [0, 0, -1, 1];

  const onProcess = () => {
    for (let t = 0; t < teacher_position.length; t++) {
      const { x, y } = teacher_position[t];

      for (let i = 0; i < 4; i++) {
        let nx = x + dx[i];
        let ny = y + dy[i];

        while (true) {
          if (nx < 0 || ny < 0 || nx >= N || ny >= N) break;

          if (map[nx][ny] === "S") {
            // 학생 감시 가능
            return true;
          } else if (map[nx][ny] === "T" || map[nx][ny] === "O") {
            break;
          }

          nx += dx[i];
          ny += dy[i];
        }
      }
    }

    return false;
  };

  const dfs = (count) => {
    if (count === 3) {
      if (!onProcess()) {
        result = true;
      }

      return;
    }

    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        if (map[i][j] === "X") {
          map[i][j] = "O";
          dfs(count + 1);
          map[i][j] = "X";
        }
      }
    }
  };

  dfs(0);
  return result ? "YES" : "NO";
};

console.log(solution());
