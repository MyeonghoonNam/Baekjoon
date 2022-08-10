const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `3 4 0
64 64 64 64
64 64 64 64
64 64 64 63`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const [N, M, B] = input().split(" ").map(Number);
  const map = [];
  let minTime = Number.MAX_SAFE_INTEGER;
  let maxHeight = 0;

  for (let i = 0; i < N; i++) {
    const row = input().split(" ").map(Number);
    map.push(row);
  }

  for (let h = 0; h <= 256; h++) {
    let buildBlockCount = 0;
    let removeBlockCount = 0;

    for (let i = 0; i < N; i++) {
      for (let j = 0; j < M; j++) {
        const height = map[i][j] - h;

        if (height > 0) {
          removeBlockCount += height;
        } else if (height < 0) {
          buildBlockCount -= height;
        }
      }
    }

    if (removeBlockCount + B >= buildBlockCount) {
      const time = removeBlockCount * 2 + buildBlockCount;

      if (minTime >= time) {
        minTime = time;
        maxHeight = h;
      }
    }
  }

  return `${minTime} ${maxHeight}`;
};

console.log(solution());
