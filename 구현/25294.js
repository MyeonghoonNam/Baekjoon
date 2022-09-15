const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `10
1 3 1 1
1 3 2 1
1 3 2 2
2 3 9
2 3 6
1 5 2 2
1 5 4 2
2 5 4
2 5 22
1 5 3 2`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const cache = {};

const getSnailArray = (n) => {
  if (cache[n]) {
    return cache[n];
  }

  const arr = Array.from(new Array(n), () => new Array(n));

  let x = 0;
  let y = -1;
  let increment = 1;
  let repeatCount = n;
  let value = 1;

  while (true) {
    for (let i = 0; i < repeatCount; i++) {
      y += increment;
      arr[x][y] = value;
      value += 1;
    }

    repeatCount -= 1;

    if (repeatCount === 0) break;

    for (let i = 0; i < repeatCount; i++) {
      x += increment;
      arr[x][y] = value;
      value += 1;
    }

    increment *= -1;
  }

  cache[n] = arr;

  return arr;
};

const getNumberPosition = (arr, z) => {
  const length = arr.length;

  for (let x = 0; x < length; x++) {
    for (let y = 0; y < length; y++) {
      if (arr[x][y] === z) {
        return `${x + 1} ${y + 1}`;
      }
    }
  }
};

const solution = () => {
  const Q = Number(input());
  const result = [];

  for (let i = 0; i < Q; i++) {
    const [number, ...rest] = input().split(" ").map(Number);

    switch (number) {
      case 1: {
        const [n, x, y] = rest;
        const snail = getSnailArray(n);

        result.push(snail[x - 1][y - 1]);

        break;
      }
      case 2: {
        const [n, z] = rest;
        const snail = getSnailArray(n);

        result.push(getNumberPosition(snail, z));

        break;
      }
      default:
    }
  }

  return result.join("\n");
};

console.log(solution());
