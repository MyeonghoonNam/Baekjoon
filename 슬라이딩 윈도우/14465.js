const fs = require("fs");
const stdin = (
  process.platform === "linux"
    ? fs.readFileSync("/dev/stdin").toString()
    : `10 6 5
2
10
1
5
9`
).split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

const solution = () => {
  const [N, K, B] = input().split(" ").map(Number);
  const map = new Array(100001).fill(0); // 고장난신호등: 0, 정상신호등: 1
  let result = 100000;
  let count = 0; // 고장난 신호등 수

  for (let i = 0; i < B; i++) {
    const index = Number(input());
    map[index] = 1;
  }

  for (let i = 1; i <= K; i++) {
    if (map[i]) {
      count++;
    }
  }

  result = count;

  for (let i = K + 1; i <= N; i++) {
    count += map[i];
    count -= map[i - K];
    result = Math.min(result, count);
  }

  return result;
};

console.log(solution());
