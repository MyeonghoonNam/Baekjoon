const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `2 1234567890`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const map = [
    [1, 1, 1, 0, 1, 1, 1], // 0
    [0, 0, 1, 0, 0, 1, 0], // 1
    [1, 0, 1, 1, 1, 0, 1], // 2
    [1, 0, 1, 1, 0, 1, 1], // 3
    [0, 1, 1, 1, 0, 1, 0], // 4
    [1, 1, 0, 1, 0, 1, 1], // 5
    [1, 1, 0, 1, 1, 1, 1], // 6
    [1, 0, 1, 0, 0, 1, 0], // 7
    [1, 1, 1, 1, 1, 1, 1], // 8
    [1, 1, 1, 1, 0, 1, 1], // 9
  ];

  const monitor = (number, index) => {
    if (index % 3 === 0) {
      result += " ";

      if (map[number][index] === 1) {
        for (let i = 0; i < S; i++) {
          result += "-";
        }
      } else {
        for (let i = 0; i < S; i++) {
          result += " ";
        }
      }

      result += "  ";
    } else {
      if (map[number][index] === 1) {
        result += "|";
      } else {
        result += " ";
      }

      if (index % 3 === 1) {
        for (let i = 0; i < S; i++) {
          result += " ";
        }
      } else {
        result += " ";
      }
    }
  };

  const data = input().split(" ");
  const S = Number(data[0]);
  const N = data[1];
  let result = "";

  for (let i = 0; i < N.length; i++) {
    monitor(Number(N[i]), 0);
  }
  result += "\n";

  for (let i = 0; i < S; i++) {
    for (let j = 0; j < N.length; j++) {
      for (let k = 1; k < 3; k++) {
        monitor(Number(N[j]), k);
      }
    }
    result += "\n";
  }

  for (let i = 0; i < N.length; i++) {
    monitor(Number(N[i]), 3);
  }
  result += "\n";

  for (let i = 0; i < S; i++) {
    for (let j = 0; j < N.length; j++) {
      for (let k = 4; k < 6; k++) {
        monitor(Number(N[j]), k);
      }
    }
    result += "\n";
  }

  for (let i = 0; i < N.length; i++) {
    monitor(Number(N[i]), 6);
  }
  result += "\n";

  return result;
};

console.log(solution());
