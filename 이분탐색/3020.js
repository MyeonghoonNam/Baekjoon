const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `14 5
1
3
4
2
2
4
3
4
3
3
3
2
3
3`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const [N, H] = input().split(" ").map(Number);
  const down = new Array(H + 2).fill(0);
  const up = new Array(H + 2).fill(0);

  for (let i = 1; i <= parseInt(N / 2); i++) {
    const a = Number(input());
    const b = H - Number(input()) + 1;

    down[a]++;
    up[b]++;
  }

  for (let i = 1; i <= H; i++) {
    down[i] += down[i - 1];
  }

  for (let i = H; i >= 1; i--) {
    up[i] += up[i + 1];
  }

  let result = N;
  let count = 0;

  for (let i = 1; i < H + 1; i++) {
    const diff = down[H] - down[i - 1] + up[1] - up[i + 1];

    if (diff < result) {
      result = diff;
      count = 1;
    } else if (diff === result) {
      count += 1;
    }
  }

  return `${result} ${count}`;
};

console.log(solution());
