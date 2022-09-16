// 구현 해보고 싶은 여러 갈래의 소용돌이 알고리즘
const print = (arr) => {
  let result = [];

  arr.forEach((row) => {
    result.push(row.join(" "));
  });

  return result.join("\n");
};

const changeDirection = (dir, clockwise) => {
  if (clockwise) {
    if (dir === 3) {
      dir = 0;
    } else {
      dir += 1;
    }
  } else {
    if (dir === 0) {
      dir = 3;
    } else {
      dir -= 1;
    }
  }

  return dir;
};

const solution = (n, clockwise) => {
  if (n === 1) {
    return 1;
  }
  const position = clockwise
    ? [
        [0, -1],
        [-1, n - 1],
        [n - 1, n],
        [n, 0],
      ]
    : [
        [-1, 0],
        [0, n],
        [n, n - 1],
        [n - 1, -1],
      ];

  const direction = clockwise
    ? [
        [0, 1],
        [1, 0],
        [0, -1],
        [-1, 0],
      ]
    : [
        [1, 0],
        [0, -1],
        [-1, 0],
        [0, 1],
      ];

  const map = Array.from(new Array(n), () => new Array(n).fill(0));

  for (let i = 0; i < 4; i++) {
    let changeDirMaxCount = Math.round(n / 2);
    let repeatCount = n - 1;
    let value = 1;

    let [x, y] = position[i];

    let dir = i;

    while (changeDirMaxCount--) {
      const [dx, dy] = direction[dir];

      for (let j = 0; j < repeatCount; j++) {
        const nx = x + dx;
        const ny = y + dy;

        map[nx][ny] = value;
        value += 1;

        x = nx;
        y = ny;
      }

      if (repeatCount === 2) {
        repeatCount -= 1;
      } else {
        repeatCount -= 2;
      }

      dir = changeDirection(dir, clockwise);
    }
  }

  return print(map);
};

const n = 1; // 행과 열의 크기
const clockwise = false; // false로 변환하여 방향 반대로 테스트 가능

console.log(solution(n, clockwise));
