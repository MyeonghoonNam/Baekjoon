const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `3 2
..
.*
..
5 5
*.*.*
..*..
*****
.....
..**.
0 0`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const result = [];

  const direction = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, 1],
    [1, 1],
    [1, 0],
    [1, -1],
    [0, -1],
  ];

  const printMap = (map) => {
    for (let i = 0; i < map.length; i++) {
      result.push(map[i].join(""));
    }
  };

  while (true) {
    const [R, C] = input().split(" ").map(Number);

    if (R === 0 && C === 0) break;

    const mineMap = Array.from(new Array(R), () => new Array(C));
    const inputMap = [];

    for (let i = 0; i < R; i++) {
      const row = input().split("");
      inputMap.push(row);
    }

    for (let i = 0; i < R; i++) {
      for (let j = 0; j < C; j++) {
        if (inputMap[i][j] === "*") {
          mineMap[i][j] = "*";
        } else {
          let count = 0;

          for (let k = 0; k < 8; k++) {
            const [dx, dy] = direction[k];

            const nx = i + dx;
            const ny = j + dy;

            if (nx >= 0 && ny >= 0 && nx < R && ny < C) {
              if (inputMap[nx][ny] === "*") {
                count += 1;
              }
            }
          }

          mineMap[i][j] = count;
        }
      }
    }

    printMap(mineMap);
  }

  return result.join("\n");
};

console.log(solution());
