const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `7 6 2 3 15 6 9 8
3 1 1 8 14 7 10 1
6 1 13 6 4 3 11 4
16 1 8 7 5 2 12 2`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const map = Array.from(new Array(4), () => new Array());

  for (let i = 0; i < 4; i++) {
    const row = input().split(" ").map(Number);

    for (let j = 0; j < 4; j++) {
      map[i][j] = [row[j * 2], row[j * 2 + 1] - 1];
    }
  }

  const dx = [-1, -1, 0, 1, 1, 1, 0, -1];
  const dy = [0, -1, -1, -1, 0, 1, 1, 1];

  const turnLeft = (direction) => {
    return (direction + 1) % 8;
  };

  const copyMap = (map) => {
    const copy = Array.from(new Array(4), () => new Array());

    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        copy[i][j] = [...map[i][j]];
      }
    }

    return copy;
  };

  const findFish = (map, value) => {
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (map[i][j][0] === value) {
          return [i, j];
        }
      }
    }

    return false;
  };

  const moveAllFish = (map, shark_x, shark_y) => {
    for (let i = 1; i < 17; i++) {
      const position = findFish(map, i);

      if (position !== false) {
        const [x, y] = position;
        let direction = map[x][y][1];

        for (let j = 0; j < 8; j++) {
          const nx = x + dx[direction];
          const ny = y + dy[direction];

          if (checkMapRange(nx, ny) && !(nx === shark_x && ny === shark_y)) {
            map[x][y][1] = direction;
            [map[x][y], map[nx][ny]] = [map[nx][ny], map[x][y]];
            break;
          }

          direction = turnLeft(direction);
        }
      }
    }
  };

  const getPossibleSharkPosition = (map, x, y) => {
    const position = [];
    const direction = map[x][y][1];

    for (let i = 0; i < 4; i++) {
      x += dx[direction];
      y += dy[direction];

      if (checkMapRange(x, y) && map[x][y][0] !== -1) {
        position.push([x, y]);
      }
    }

    return position;
  };

  const checkMapRange = (x, y) => {
    if (x >= 0 && y >= 0 && x < 4 && y < 4) return true;
    else return false;
  };

  const dfs = (map, x, y, total) => {
    const copy_map = copyMap(map);

    total += copy_map[x][y][0];
    copy_map[x][y][0] = -1;

    moveAllFish(copy_map, x, y);

    const position = getPossibleSharkPosition(copy_map, x, y);

    if (position.length === 0) {
      result = Math.max(result, total);
      return;
    }

    for (let i = 0; i < position.length; i++) {
      const [x, y] = position[i];
      dfs(copy_map, x, y, total);
    }
  };

  let result = 0;
  dfs(map, 0, 0, 0);

  return result;
};

console.log(solution());
