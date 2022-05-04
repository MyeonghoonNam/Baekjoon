const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `3 4
JLA
CRUO
3`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const jump = () => {
    let temp = [...result];
    let temp2 = [...temp];
    for (let i = 0; i < temp.length - 1; i++) {
      const front = temp[i + map[temp[i]]] ?? false;

      if (front && map[front] !== map[temp[i]]) {
        const t = temp2[i];
        temp2[i] = temp2[i + 1];
        temp2[i + 1] = t;
        i += 1;
      }
    }

    result = [...temp2];
  };

  const [N1, N2] = input().split(" ").map(Number);
  let group1 = input();
  let group2 = input();
  const T = Number(input());

  const map = {};
  for (let i = 0; i < N1; i++) {
    map[group1[i]] = 1;
  }

  for (let i = 0; i < N2; i++) {
    map[group2[i]] = -1;
  }

  group1 = group1.split("").reverse().join("");

  let result = (group1 + group2).split("");

  for (let i = 0; i < T; i++) {
    jump();
  }

  return result.join("");
};

console.log(solution());
