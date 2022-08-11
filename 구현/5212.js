const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `3 10
..........
..XXX.XXX.
XXX.......`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const [R, C] = input().split(" ").map(Number);
  const map = Array.from(new Array(R + 2), () => new Array(C + 2).fill("."));
  const after50YearMap = Array.from(new Array(R + 2), () =>
    new Array(C + 2).fill(".")
  );
  const newMap = [];

  // 기존 지도의 범위 밖은 모두 바다이므로 테두리를 바다로 확장
  const onExtendMap = () => {
    for (let i = 1; i <= R; i++) {
      const row = input().split("");

      for (let j = 1; j <= C; j++) {
        map[i][j] = row[j - 1];
        after50YearMap[i][j] = row[j - 1];
      }
    }
  };

  const onAfter50Year = () => {
    const dx = [-1, 1, 0, 0];
    const dy = [0, 0, -1, 1];

    for (let i = 1; i <= R; i++) {
      for (let j = 1; j <= C; j++) {
        if (after50YearMap[i][j] !== "X") continue;

        let seaCount = 0;
        for (let k = 0; k < 4; k++) {
          const nx = i + dx[k];
          const ny = j + dy[k];

          if (after50YearMap[nx][ny] === ".") {
            seaCount++;
          }
        }

        if (seaCount >= 3) {
          map[i][j] = ".";
        }
      }
    }
  };

  const setNewMap = () => {
    const { firstXIndex, firstYIndex } = getFirstXAndYIndex();
    const { lastXIndex, lastYIndex } = getLastXAndYIndex();

    for (let i = firstXIndex; i <= lastXIndex; i++) {
      const row = [];

      for (let j = firstYIndex; j <= lastYIndex; j++) {
        row.push(map[i][j]);
      }

      newMap.push(row);
    }
  };

  const getFirstXAndYIndex = () => {
    let firstXIndex = Number.MAX_SAFE_INTEGER;
    let firstYIndex = Number.MAX_SAFE_INTEGER;

    for (let i = 1; i <= R; i++) {
      for (let j = 1; j <= C; j++) {
        if (map[i][j] === "X") {
          firstXIndex = Math.min(firstXIndex, i);
          firstYIndex = Math.min(firstYIndex, j);
        }
      }
    }

    return { firstXIndex, firstYIndex };
  };

  const getLastXAndYIndex = () => {
    let lastXIndex = Number.MIN_SAFE_INTEGER;
    let lastYIndex = Number.MIN_SAFE_INTEGER;

    for (let i = 1; i <= R; i++) {
      for (let j = 1; j <= C; j++) {
        if (map[i][j] === "X") {
          lastXIndex = Math.max(lastXIndex, i);
          lastYIndex = Math.max(lastYIndex, j);
        }
      }
    }

    return { lastXIndex, lastYIndex };
  };

  const getPrintMap = () => {
    let result = [];

    newMap.forEach((row) => {
      result.push(row.join(""));
    });

    return result.join("\n");
  };

  const onProcess = () => {
    onExtendMap();
    onAfter50Year();
    setNewMap();
  };

  onProcess();
  return getPrintMap();
};

console.log(solution());
