const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `8 8
2 0 0 0 0 0 0 2
2 0 0 0 0 0 0 2
2 0 0 0 0 0 0 2
2 0 0 0 0 0 0 2
2 0 0 0 0 0 0 2
0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

/**
 * 벽을 반드시 3개를 세워야한다.
 * 0 빈칸, 1 벽, 2 바이러스
 * 바이러스 이동가능방향은 상하좌우
 * 안전영역 = 바이러스가 퍼질 수 없는 곳
 *
 * 요구사항 : 안전 영역 크기의 최댓값 출력
 * 1. 초기 지도에서 빈 칸의 모든 영역을 완전탐색하며 벽을 3개씩 세운다.
 * 2. 바이러스를 퍼지게한다. 이 때 벽을 세운 map을 복사하여 바이러스를 퍼지게한다.
 * 3. 안전영역을 구하고 현재까지의 최대 크기와 비교하여 최댓값을 갱신한다.
 *
 * 위 과정을 반복하며 벽 3개를 세울 수 있는 모든 경우를 탐색한다.
 */

// 2차 해결
const solution = () => {
  const [N, M] = input().split(" ").map(Number);
  const initMap = [];
  const copyMap = Array.from(new Array(N), () => new Array(M));
  const MAX_WALL_COUNT = 3;
  const dx = [-1, 1, 0, 0];
  const dy = [0, 0, -1, 1];
  let result = Number.MIN_SAFE_INTEGER;

  for (let i = 0; i < N; i++) {
    const row = input().split(" ").map(Number);
    initMap.push(row);
  }

  const virus = (x, y) => {
    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];

      if (!checkMapRange(nx, ny)) continue;

      if (copyMap[nx][ny] === 0) {
        copyMap[nx][ny] = 2;
        virus(nx, ny);
      }
    }
  };

  const getScore = () => {
    let score = 0;

    for (let i = 0; i < N; i++) {
      for (let j = 0; j < M; j++) {
        if (copyMap[i][j] === 0) {
          score += 1;
        }
      }
    }

    return score;
  };

  const dfs = (wallCount) => {
    if (wallCount === MAX_WALL_COUNT) {
      for (let i = 0; i < N; i++) {
        for (let j = 0; j < M; j++) {
          copyMap[i][j] = initMap[i][j];
        }
      }

      for (let i = 0; i < N; i++) {
        for (let j = 0; j < M; j++) {
          if (copyMap[i][j] === 2) {
            virus(i, j);
          }
        }
      }

      result = Math.max(result, getScore());

      return;
    }

    for (let i = 0; i < N; i++) {
      for (let j = 0; j < M; j++) {
        if (initMap[i][j] === 0) {
          initMap[i][j] = 1;
          wallCount += 1;
          dfs(wallCount);
          wallCount -= 1;
          initMap[i][j] = 0;
        }
      }
    }
  };

  const checkMapRange = (x, y) => {
    if (x >= 0 && y >= 0 && x < N && y < M) return true;
    else return false;
  };

  dfs(0);

  return result;
};

// 1차 해결
// const solution = () => {
//   const [N, M] = input().split(" ").map(Number);
//   const init_map = [];
//   const copy_map = Array.from(new Array(N), () => new Array());
//   let result = 0;

//   for (let i = 0; i < N; i++) {
//     const data = input().split(" ").map(Number);
//     init_map.push(data);
//   }

//   const dx = [-1, 1, 0, 0];
//   const dy = [0, 0, -1, 1];

//   const virus = (x, y) => {
//     for (let i = 0; i < 4; i++) {
//       const nx = x + dx[i];
//       const ny = y + dy[i];

//       if (checkMapRange(nx, ny) && copy_map[nx][ny] === 0) {
//         copy_map[nx][ny] = 2;
//         virus(nx, ny);
//       }
//     }
//   };

//   const checkMapRange = (x, y) => {
//     if (x >= 0 && y >= 0 && x < N && y < M) return true;
//     else return false;
//   };

//   const getSafeArea = () => {
//     let size = 0;

//     for (let i = 0; i < N; i++) {
//       for (let j = 0; j < M; j++) {
//         if (copy_map[i][j] === 0) {
//           size += 1;
//         }
//       }
//     }

//     return size;
//   };

//   const buildWall = (wall_count = 0) => {
//     if (wall_count === 3) {
//       for (let i = 0; i < N; i++) {
//         for (let j = 0; j < M; j++) {
//           copy_map[i][j] = init_map[i][j];
//         }
//       }

//       for (let i = 0; i < N; i++) {
//         for (let j = 0; j < M; j++) {
//           if (copy_map[i][j] === 2) {
//             virus(i, j);
//           }
//         }
//       }

//       result = Math.max(result, getSafeArea());
//       return;
//     }

//     for (let i = 0; i < N; i++) {
//       for (let j = 0; j < M; j++) {
//         if (init_map[i][j] === 0) {
//           init_map[i][j] = 1;
//           wall_count += 1;
//           buildWall(wall_count);
//           init_map[i][j] = 0;
//           wall_count -= 1;
//         }
//       }
//     }
//   };

//   buildWall();
//   return result;
// };

console.log(solution());
